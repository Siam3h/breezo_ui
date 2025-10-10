# Developer & Code Owner Workflow Guide

This guide explains how to contribute safely and consistently to the projects. Protected branches are `develop` (staging) and `main` (production).

---

## Developer Flow (Contributor)

Contributions should be on isolated branches. 
Open pull requests (PRs) for review and staging deployment.

### 1. Clone and Sync the Repository

```bash
git clone https://github.com/your-org/ebike-frontend.git
cd ebike-frontend
git checkout develop
git pull origin develop
```

---

###  2. Create a New Feature Branch

Use a clear and descriptive branch name:

* `feature/` → New features
* `fix/` → Bug fixes
* `chore/` → Refactoring or setup tasks

Example:

```bash
git checkout -b feature/redesign-landing-page
```

---

### 3. Make Changes Locally

Work on your assigned feature or fix. Commit frequently with meaningful messages:

```bash
git add .
git commit -m "feat: redesign landing page hero section"
```

---

### 4. Push Your Branch

```bash
git push origin feature/redesign-landing-page
```

---

### 5. Open a Pull Request (PR)

1. Go to your repository on **GitHub**
2. Click **"Compare & Pull Request"**
3. Base branch: `develop`
4. Compare branch: your feature branch
5. Add a descriptive PR title and details

**Example:**

> **Title:** feat: redesign landing page hero section
> **Description:**
>
> * Updated hero section layout
> * Added responsive images
> * Improved call-to-action visibility

---

### 6. Request Review

* Request a review from the **code owner (maintainer)**.
* The PR triggers:

  * Automated builds/tests via GitHub Actions
  * Pre-deployment preview 

Wait for review and approval before merging.

---
