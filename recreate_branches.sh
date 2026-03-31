#!/bin/bash
set -e

# PR number -> branch name mapping
declare -A BRANCHES
BRANCHES[89]="feature/88-warning-text"
BRANCHES[90]="feature/68-back-link"
BRANCHES[93]="feature/83-skip-link"
BRANCHES[94]="feature/76-notification-banner"
BRANCHES[95]="feature/79-phase-banner"
BRANCHES[96]="feature/77-pagination"
BRANCHES[97]="feature/71-cookie-banner"
BRANCHES[98]="feature/72-fieldset"
BRANCHES[99]="feature/81-select"
BRANCHES[100]="feature/85-table"
BRANCHES[101]="feature/86-tabs"
BRANCHES[102]="feature/84-summary-list"
BRANCHES[103]="feature/87-task-list"
BRANCHES[104]="feature/80-radios"
BRANCHES[105]="feature/82-service-navigation"
BRANCHES[106]="feature/70-character-count"
BRANCHES[107]="feature/78-password-input"
BRANCHES[108]="feature/67-accordion"
BRANCHES[109]="feature/66-checkboxes"
BRANCHES[110]="feature/74-header"
BRANCHES[111]="feature/73-footer"

for PR in "${!BRANCHES[@]}"; do
  BRANCH="${BRANCHES[$PR]}"
  echo "=== PR #$PR -> $BRANCH ==="
  
  git switch main 2>/dev/null
  git branch -D "$BRANCH" 2>/dev/null || true
  git switch -c "$BRANCH" 2>/dev/null
  
  # Download and apply the diff
  if curl -sL "https://github.com/rottitime/govuk-design-react/pull/${PR}.diff" | git apply --3way 2>/dev/null; then
    git add -A
    git -c commit.gpgsign=false commit -m "Recreate PR #${PR} from diff" --allow-empty 2>/dev/null
    echo "  OK: Branch $BRANCH created"
  else
    echo "  WARN: Diff apply had issues for PR #$PR, trying with --reject"
    git add -A
    git -c commit.gpgsign=false commit -m "Recreate PR #${PR} from diff (partial)" --allow-empty 2>/dev/null
  fi
done

echo "=== Done ==="
git branch -a | grep feature
