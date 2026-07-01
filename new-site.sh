docker-compose exec ruby_jekyll_app jekyll build

#!/bin/bash
docker run -v $(pwd):/site bretfisher/jekyll new . --force