

When you want to analyse a projects state 

### Find Files with the Most Commits (Excluding Folders)

```sh
git log --pretty=format: --name-only -- '*/*' ':!tests/**' ':!docs/**' | sort | uniq -c | sort -rn | head -n 50
```

* `':!tests/**'`: Excludes everything in the tests/ folder.
* `':!docs/**'`: Excludes everything in the docs/ folder.
* `head -n 50`: Ensures you only see the top 50 results.

### Find Files with the Most Changes (Insertions/Deletions, Excluding Folders)

```sh
git log --pretty=format: --numstat -- '*/*' ':!tests/**' ':!docs/**' | awk '{print $1+$2 " " $3}' | sort -rn | head -n 50
```

