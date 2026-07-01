import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import elkLayouts from 'https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk@0.2.1/dist/mermaid-layout-elk.esm.min.mjs';
import Panzoom from 'https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.6.2/dist/panzoom.es.js';

var MAX_INITIAL_SCALE = 2.5;

function stripMermaidFrontmatter(code) {
  var trimmed = code.trim();
  if (!trimmed.startsWith('---')) {
    return trimmed;
  }

  var end = trimmed.indexOf('---', 3);
  if (end === -1) {
    return trimmed;
  }

  return trimmed.slice(end + 3).trim();
}

function isMermaidCode(code) {
  var diagramCode = stripMermaidFrontmatter(code);
  var mermaidKeywords = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'gantt',
    'stateDiagram', 'erDiagram', 'journey', 'gitgraph',
    'pie', 'quadrantChart', 'requirement', 'mindmap', 'timeline'
  ];

  return mermaidKeywords.some(function(keyword) {
    return diagramCode.startsWith(keyword);
  });
}

function getDiagramSize(element, scale) {
  var svg = element.querySelector('svg');
  var target = svg || element;
  var rect = target.getBoundingClientRect();
  var activeScale = scale || 1;
  return {
    width: rect.width / activeScale,
    height: rect.height / activeScale
  };
}

function computeFitScale(element, viewport, scale) {
  var size = getDiagramSize(element, scale || 1);
  var availableWidth = viewport.clientWidth - 40;
  var availableHeight = viewport.clientHeight - 40;
  var scaleX = availableWidth / size.width;
  var scaleY = availableHeight / size.height;
  var fitScale = Math.min(scaleX, scaleY);

  if (fitScale > 1) {
    fitScale = Math.min(fitScale, MAX_INITIAL_SCALE);
  }

  return fitScale;
}

function centerElementInViewport(panzoomInstance, element, viewport) {
  var scale = panzoomInstance.getScale();
  var size = getDiagramSize(element, scale);
  var panX = (viewport.clientWidth - size.width * scale) / (2 * scale);
  var panY = (viewport.clientHeight - size.height * scale) / (2 * scale);

  panzoomInstance.pan(panX, panY, { force: true });
  return { x: panX, y: panY };
}

function initMermaidPanzoom(container, viewport) {
  var panzoomInstance = Panzoom(container, {
    startScale: 1,
    minScale: 0.05,
    maxScale: 5,
    cursor: 'grab',
    panOnlyWhenZoomed: true,
    origin: '0 0'
  });

  var fitScale = computeFitScale(container, viewport, 1);
  panzoomInstance.setOptions({ minScale: fitScale * 0.5 });
  panzoomInstance._fitScale = fitScale;
  panzoomInstance.zoom(fitScale, { animate: false, force: true });

  var wheelHandler = function(event) {
    panzoomInstance.zoomWithWheel(event);
  };
  viewport.addEventListener('wheel', wheelHandler, { passive: false });
  panzoomInstance._wheelHandler = wheelHandler;
  panzoomInstance._viewport = viewport;

  return panzoomInstance;
}

function finalizeFitState(panzoomInstance, container, viewport) {
  centerElementInViewport(panzoomInstance, container, viewport);
  var pan = panzoomInstance.getPan();
  panzoomInstance._fitPanX = pan.x;
  panzoomInstance._fitPanY = pan.y;
  panzoomInstance.setOptions({
    startScale: panzoomInstance._fitScale,
    startX: pan.x,
    startY: pan.y
  });
}

function createToolbarButton(label, ariaLabel, onClick) {
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'mermaid-modal-control panzoom-exclude';
  button.textContent = label;
  button.setAttribute('aria-label', ariaLabel);
  button.addEventListener('click', function(event) {
    event.stopPropagation();
    onClick();
  });
  return button;
}

function createModalToolbar(panzoomInstance, closeModal, fitDiagram) {
  var toolbar = document.createElement('div');
  toolbar.className = 'mermaid-modal-toolbar';

  toolbar.appendChild(createToolbarButton('+', 'Zoom in', function() {
    panzoomInstance.zoomIn({ animate: false });
  }));
  toolbar.appendChild(createToolbarButton('−', 'Zoom out', function() {
    panzoomInstance.zoomOut({ animate: false });
  }));
  toolbar.appendChild(createToolbarButton('Fit', 'Fit diagram to view', fitDiagram));

  var closeButton = createToolbarButton('Close (ESC)', 'Close fullscreen view', closeModal);
  closeButton.classList.add('mermaid-modal-close-btn');
  toolbar.appendChild(closeButton);

  return toolbar;
}

function processMermaidBlock(block) {
  var code = block.textContent || block.innerText;

  var wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'mermaid-wrapper';
  wrapperDiv.setAttribute('data-mermaid-code', code);

  var diagramDiv = document.createElement('div');
  diagramDiv.className = 'mermaid';
  diagramDiv.textContent = code;
  wrapperDiv.appendChild(diagramDiv);

  var preElement = block.parentNode;
  preElement.parentNode.insertBefore(wrapperDiv, preElement.nextSibling);
  preElement.style.display = 'none';
}

function setupMermaidClickHandlers() {
  var wrappers = document.querySelectorAll('.mermaid-wrapper');

  wrappers.forEach(function(wrapper) {
    var diagram = wrapper.querySelector('.mermaid');
    if (!diagram) return;

    wrapper.style.cursor = 'pointer';
    wrapper.title = 'Click to view fullscreen';

    wrapper.addEventListener('click', function() {
      var mermaidCode = wrapper.getAttribute('data-mermaid-code');
      openMermaidFullscreen(mermaidCode);
    });
  });
}

function openMermaidFullscreen(mermaidCode) {
  var modal = document.createElement('div');
  modal.className = 'mermaid-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Mermaid diagram fullscreen view');

  var toolbar = document.createElement('div');
  toolbar.className = 'mermaid-modal-toolbar';

  var viewport = document.createElement('div');
  viewport.className = 'mermaid-modal-viewport';

  var diagramDiv = document.createElement('div');
  diagramDiv.className = 'mermaid mermaid-fullscreen';
  diagramDiv.textContent = mermaidCode;

  viewport.appendChild(diagramDiv);
  modal.appendChild(toolbar);
  modal.appendChild(viewport);

  var scrollY = window.scrollY;
  var panzoomInstance = null;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + scrollY + 'px';
  document.body.style.width = '90%';

  function fitDiagram() {
    if (!panzoomInstance) return;

    var svg = diagramDiv.querySelector('svg');
    if (!svg) return;

    panzoomInstance.zoom(panzoomInstance._fitScale, { animate: false, force: true });
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        if (panzoomInstance._fitPanX !== undefined) {
          panzoomInstance.pan(panzoomInstance._fitPanX, panzoomInstance._fitPanY, { force: true });
        } else {
          finalizeFitState(panzoomInstance, diagramDiv, viewport);
        }
      });
    });
  }

  function closeModal() {
    if (panzoomInstance) {
      if (panzoomInstance._wheelHandler && panzoomInstance._viewport) {
        panzoomInstance._viewport.removeEventListener('wheel', panzoomInstance._wheelHandler);
      }
      panzoomInstance.destroy();
      panzoomInstance = null;
    }

    if (modal && modal.parentNode) {
      document.body.removeChild(modal);
    }

    var savedScrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY || '0', 10) * -1);
    }
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    var tagName = event.target.tagName;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      return;
    }

    if (event.key === 'Escape' || event.keyCode === 27) {
      closeModal();
      return;
    }

    if (!panzoomInstance) return;

    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      panzoomInstance.zoomIn({ animate: false });
    } else if (event.key === '-') {
      event.preventDefault();
      panzoomInstance.zoomOut({ animate: false });
    } else if (event.key === '0') {
      event.preventDefault();
      fitDiagram();
    }
  }

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleKeydown);

  setTimeout(function() {
    mermaid.run({ nodes: [diagramDiv] }).then(function() {
      var svg = diagramDiv.querySelector('svg');
      if (!svg) {
        closeModal();
        return;
      }

      panzoomInstance = initMermaidPanzoom(diagramDiv, viewport);

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          finalizeFitState(panzoomInstance, diagramDiv, viewport);

          var toolbarElement = createModalToolbar(panzoomInstance, closeModal, fitDiagram);
          toolbar.replaceWith(toolbarElement);

          var closeButton = toolbarElement.querySelector('.mermaid-modal-close-btn');
          if (closeButton) {
            closeButton.focus();
          }
        });
      });
    }).catch(function(err) {
      console.error('Error rendering mermaid:', err);
      closeModal();
    });
  }, 10);
}

async function initMermaid() {
  if (typeof jekyllTabs !== 'undefined') {
    jekyllTabs.init({
      syncTabsWithSameLabels: true,
      addCopyToClipboardButtons: true,
      copyToClipboardSettings: {
        buttonHTML: '<button type="button" class="jekyll-tabs-copy-button" aria-label="Copy code to clipboard">Copy</button>',
        showToastMessageOnCopy: true,
        toastMessage: 'Code copied to clipboard',
        toastDuration: 3000
      }
    });
  }

  mermaid.registerLayoutLoaders(elkLayouts);

  var elkLoader = elkLayouts.find(function(layout) {
    return layout.name === 'elk';
  });
  if (elkLoader && typeof elkLoader.loader === 'function') {
    await elkLoader.loader();
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    },
    sequence: {
      useMaxWidth: true
    },
    gantt: {
      useMaxWidth: true
    }
  });

  var allCodeBlocks = document.querySelectorAll('pre code');

  allCodeBlocks.forEach(function(block) {
    var code = block.textContent || block.innerText;
    var trimmedCode = code.trim();

    if (isMermaidCode(trimmedCode)) {
      processMermaidBlock(block);
    }
  });

  var mermaidElements = document.querySelectorAll('.mermaid');
  if (mermaidElements.length > 0) {
    try {
      await mermaid.run({ nodes: mermaidElements });
      setTimeout(setupMermaidClickHandlers, 100);
    } catch (err) {
      console.error('Error rendering mermaid:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMermaid);
} else {
  initMermaid();
}
