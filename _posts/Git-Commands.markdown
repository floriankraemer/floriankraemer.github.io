
When you want to analyse a projects state 

### Find Files with the Most Commits (Excluding Folders)

```sh
git log --pretty=format: --name-only -- '*/*' ':!tests/**' ':!docs/**' | sort | uniq -c | sort -rn | head -n 50
```

* `':!tests/**'`: Excludes everything in the tests/ folder.
* `':!docs/**'`: Excludes everything in the docs/ folder.
* `head -n 50`: Ensures you only see the top 50 results.

### Find Files with the Most Changes (Insertions/Deletions, Excluding Folders)

This command lists the top 50 most-changed files in the repository (by total lines added+deleted across history), excluding tests/** and docs/**, and excluding files in the repo root.

```sh
git log --pretty=format: --numstat -- '*/*' ':!tests/**' ':!docs/**' \
| awk '{print $1+$2 " " $3}' \
| sort -rn \
| head -n 50
```

This gives you the 50 most churned file/author combinations.

```sh
git log --pretty="%an" --numstat -- '*/*' ':!tests/**' ':!docs/**' \
| awk 'NF==1 {author=$0} NF==3 {print author, $3, $1+$2}' \
| awk '{key=$1 " " $2; churn[key]+=$3} END {for (k in churn) print churn[k], k}' \
| sort -rn \
| head -n 50
```

This kind of churn analysis (author ↔ file changes) is useful because it reveals where change happens in your system, and who is responsible for it. In software architecture and engineering management, this matters for several reasons: