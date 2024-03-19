---
layout: post
title: 
categories: software-architecture
tags: software-architecture
---

```diff
diff --git a/src/Authenticator/HttpDigestAuthenticator.php b/src/Authenticator/HttpDigestAuthenticator.php
index 0d514e7..e8e5118 100644
--- a/src/Authenticator/HttpDigestAuthenticator.php
+++ b/src/Authenticator/HttpDigestAuthenticator.php
@@ -285,6 +285,16 @@ class HttpDigestAuthenticator extends HttpBasicAuthenticator
         ];
     }
 
+    protected function formatOptions(string $key, mixed $value): string
+    {
+        if (is_bool($value)) {
+            $value = $value ? 'true' : 'false';
+            return sprintf('%s=%s', $key, $value);
+        }
+
+        return sprintf('%s="%s"', $key, $value);
+    }
+
     /**
      * Generate the login headers
      *
@@ -300,15 +310,12 @@ class HttpDigestAuthenticator extends HttpBasicAuthenticator
             $options['stale'] = true;
         }
 
-        $opts = [];
-        foreach ($options as $k => $v) {
-            if (is_bool($v)) {
-                $v = $v ? 'true' : 'false';
-                $opts[] = sprintf('%s=%s', $k, $v);
-            }
+        $formattedOptions = [];
+        foreach ($options as $key => $value) {
+            $formattedOptions[] = $this->formatOptions($key, $value);
         }
 
-        return ['WWW-Authenticate' => 'Digest ' . implode(',', $opts)];
+        return ['WWW-Authenticate' => 'Digest ' . implode(',', $formattedOptions)];
     }
 
     /**
```

How is the refactored code any better than the previous code?

* The separation of concerns (SOC) principle has been applied.
* The single responsibility principle (SRP) has been applied.
* An else statement has been removed (improves cognitive load).
* Readability has been improved.
