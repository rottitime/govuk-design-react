#!/usr/bin/env python3
"""Fix all review comments across 22 govuk-design-react PRs.
Each branch is handled once to avoid reset issues."""
import subprocess, os, re

os.chdir('/tmp/govuk-fix')

def run(cmd, check=True):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and r.returncode != 0:
        print(f"  ERROR: {cmd}\n  {r.stderr[:200]}")
    return r.stdout.strip()

def checkout_fresh(branch):
    """Checkout branch fresh from origin"""
    run(f'git checkout -B {branch} origin/{branch} 2>/dev/null', check=False)

def read_file(path):
    with open(path, 'r') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w') as f:
        f.write(content)

def commit(msg):
    run('git add -A')
    r = subprocess.run('git diff --cached --quiet', shell=True)
    if r.returncode != 0:
        run(f'git commit -m "{msg}"')
        return True
    return False

def remove_as_string(comp_dir, comp):
    """Remove 'as string' casts from component tsx files."""
    changed = False
    for fname in os.listdir(comp_dir):
        if not fname.endswith('.tsx') or '.test.' in fname or '.stories.' in fname:
            continue
        fpath = os.path.join(comp_dir, fname)
        content = read_file(fpath)
        new_content = content.replace('className as string', 'className')
        if new_content != content:
            write_file(fpath, new_content)
            changed = True
    return changed

run('git config user.email "rameshreddy.adutla@gmail.com"')
run('git config user.name "Ramesh Reddy Adutla"')

BRANCHES = {
    'feature/88-warning-text': ('WarningText', 89),
    'feature/68-back-link': ('BackLink', 90),
    'feature/69-breadcrumbs': ('Breadcrumbs', 91),
    'feature/83-skip-link': ('SkipLink', 93),
    'feature/76-notification-banner': ('NotificationBanner', 94),
    'feature/79-phase-banner': ('PhaseBanner', 95),
    'feature/77-pagination': ('Pagination', 96),
    'feature/71-cookie-banner': ('CookieBanner', 97),
    'feature/72-fieldset': ('Fieldset', 98),
    'feature/81-select': ('Select', 99),
    'feature/85-table': ('Table', 100),
    'feature/86-tabs': ('Tabs', 101),
    'feature/84-summary-list': ('SummaryList', 102),
    'feature/87-task-list': ('TaskList', 103),
    'feature/80-radios': ('Radios', 104),
    'feature/82-service-navigation': ('ServiceNavigation', 105),
    'feature/70-character-count': ('CharacterCount', 106),
    'feature/78-password-input': ('PasswordInput', 107),
    'feature/67-accordion': ('Accordion', 108),
    'feature/66-checkboxes': ('Checkboxes', 109),
    'feature/74-header': ('Header', 110),
    'feature/73-footer': ('Footer', 111),
}

for branch, (comp, pr_num) in BRANCHES.items():
    print(f"\n=== PR #{pr_num}: {comp} ({branch}) ===")
    checkout_fresh(branch)
    
    comp_dir = f'src/components/{comp}'
    comp_tsx = f'{comp_dir}/{comp}.tsx'
    
    # --- Common: Remove 'as string' casts ---
    if os.path.isdir(comp_dir):
        if remove_as_string(comp_dir, comp):
            commit(f"refactor: remove unnecessary as string casts in {comp}")
            print(f"  ✅ Removed 'as string' casts")
    
    # --- Component-specific fixes ---
    
    if comp == 'Breadcrumbs':
        # Fix Figma URL and broken string in stories
        stories_path = f'{comp_dir}/Breadcrumbs.stories.tsx'
        content = read_file(stories_path)
        content = re.sub(
            r"component:\s*\n\s*'The breadcrumbs.*?for more details\.'",
            "component:\n          'The breadcrumbs component helps users to understand where they are within a website\\'s structure and move between levels. See https://design-system.service.gov.uk/components/breadcrumbs/ for more details.'",
            content,
            flags=re.DOTALL
        )
        content = re.sub(
            r"url:\s*'https://www\.figma\.com/design/[^']*'",
            "url: 'https://www.figma.com/design/Uim7G5Td35hg5PTGQ79OA1/GOV.UK-Design-System--Community-?node-id=20123-12775&t=iHqp2471YNPlJMvO-0'",
            content
        )
        write_file(stories_path, content)
        commit("fix: update Figma URL and fix broken description string in Breadcrumbs stories")
        print("  ✅ Fixed Figma URL and broken description (rottitime)")

    elif comp == 'ServiceNavigation':
        content = read_file(comp_tsx)
        # Fix props spread order
        content = content.replace(
            '      data-module="govuk-service-navigation"\n      {...props}',
            '      {...props}\n      data-module="govuk-service-navigation"'
        )
        # Add useId import
        content = content.replace(
            "import type { ComponentProps } from 'react'",
            "import { useId, type ComponentProps } from 'react'"
        )
        # Add navId
        content = content.replace(
            '}: Props) {\n  return (',
            '}: Props) {\n  const navId = useId()\n\n  return ('
        )
        # Replace hard-coded id/aria-controls
        content = content.replace('aria-controls="navigation"', 'aria-controls={navId}')
        content = content.replace('id="navigation"', 'id={navId}')
        write_file(comp_tsx, content)
        commit("fix: use useId() for navigation ID and fix props spread order in ServiceNavigation")
        print("  ✅ Fixed hard-coded ID → useId() + props spread order")

    elif comp == 'Header':
        content = read_file(comp_tsx)
        # Fix props spread order
        content = content.replace(
            '      data-module="govuk-header"\n      role="banner"\n      {...props}',
            '      {...props}\n      data-module="govuk-header"\n      role="banner"'
        )
        # Add useId import
        content = content.replace(
            "import type { ComponentProps, ReactNode } from 'react'",
            "import { useId, type ComponentProps, type ReactNode } from 'react'"
        )
        # Add navId
        content = content.replace(
            '}: Props) {\n  return (',
            '}: Props) {\n  const navId = useId()\n\n  return ('
        )
        content = content.replace('aria-controls="navigation"', 'aria-controls={navId}')
        content = content.replace('id="navigation"', 'id={navId}')
        write_file(comp_tsx, content)
        commit("fix: use useId() for navigation ID and fix props spread order in Header")
        print("  ✅ Fixed hard-coded ID → useId() + props spread order")

    elif comp == 'CookieBanner':
        content = read_file(comp_tsx)
        # Fix props spread order
        content = content.replace(
            '      data-nosnippet\n      role="region"\n      aria-label="Cookie banner"\n      hidden={hidden}\n      {...props}',
            '      {...props}\n      data-nosnippet\n      role="region"\n      aria-label="Cookie banner"\n      hidden={hidden}'
        )
        # Move button group inside grid column
        content = content.replace(
            '          </div>\n        </div>\n        {actions && actions.length > 0 && (\n          <div className="govuk-button-group">',
            '            {actions && actions.length > 0 && (\n              <div className="govuk-button-group">'
        )
        # Fix indentation of action items (add 2 more spaces)
        # The actions are inside the button-group which is now more deeply nested
        content = content.replace(
            '            {actions.map((action) =>',
            '                {actions.map((action) =>'
        )
        content = content.replace(
            '              action.type === \'link\' ? (\n                <a',
            '                  action.type === \'link\' ? (\n                    <a'
        )
        content = content.replace(
            '                  key={action.text}\n                  className="govuk-link"\n                  href={action.href}\n                >\n                  {action.text}\n                </a>',
            '                      key={action.text}\n                      className="govuk-link"\n                      href={action.href}\n                    >\n                      {action.text}\n                    </a>'
        )
        content = content.replace(
            '              ) : (\n                <button\n                  key={action.text}\n                  type="button"\n                  className="govuk-button"\n                  data-module="govuk-button"\n                  onClick={action.onClick}\n                >\n                  {action.text}\n                </button>',
            '                  ) : (\n                    <button\n                      key={action.text}\n                      type="button"\n                      className="govuk-button"\n                      data-module="govuk-button"\n                      onClick={action.onClick}\n                    >\n                      {action.text}\n                    </button>'
        )
        content = content.replace(
            '              )\n            )}\n          </div>\n        )}',
            '                  )\n                )}\n              </div>\n            )}\n          </div>\n        </div>'
        )
        write_file(comp_tsx, content)
        commit("fix: fix props spread order and move button group inside grid column in CookieBanner")
        print("  ✅ Fixed props spread order + button group placement")

    elif comp == 'NotificationBanner':
        content = read_file(comp_tsx)
        # Fix props spread order
        content = content.replace(
            '      role={role || (isSuccess ? \'alert\' : \'region\')}\n      aria-labelledby={titleId}\n      data-module="govuk-notification-banner"\n      {...props}',
            '      {...props}\n      role={role || (isSuccess ? \'alert\' : \'region\')}\n      aria-labelledby={titleId}\n      data-module="govuk-notification-banner"'
        )
        write_file(comp_tsx, content)
        commit("fix: ensure critical attrs cannot be overridden via props spread in NotificationBanner")
        print("  ✅ Fixed props spread order")

    elif comp == 'Footer':
        content = read_file(comp_tsx)
        # Fix props spread order
        content = content.replace(
            '      role="contentinfo"\n      {...props}',
            '      {...props}\n      role="contentinfo"'
        )
        # Deduplicate meta.items condition
        old_meta = '                {meta.items && meta.items.length > 0 && (\n                  <h2 className="govuk-visually-hidden">Support links</h2>\n                )}\n                {meta.items && meta.items.length > 0 && (\n                  <ul className="govuk-footer__inline-list">'
        new_meta = '                {meta.items && meta.items.length > 0 && (\n                  <>\n                    <h2 className="govuk-visually-hidden">Support links</h2>\n                    <ul className="govuk-footer__inline-list">'
        content = content.replace(old_meta, new_meta)
        
        old_close = '                  </ul>\n                )}'
        new_close = '                    </ul>\n                  </>\n                )}'
        content = content.replace(old_close, new_close)
        
        write_file(comp_tsx, content)
        commit("fix: fix props spread order and deduplicate meta.items condition in Footer")
        print("  ✅ Fixed props spread order + deduplicated condition")

    elif comp == 'Select':
        content = read_file(comp_tsx)
        # Remove selected from type and <option>
        content = content.replace('  disabled?: boolean\n  selected?: boolean\n', '  disabled?: boolean\n')
        content = content.replace('            disabled={option.disabled}\n            selected={option.selected}\n', '            disabled={option.disabled}\n')
        write_file(comp_tsx, content)
        
        # Fix test if it uses selected
        test_path = f'{comp_dir}/Select.test.tsx'
        if os.path.exists(test_path):
            tc = read_file(test_path)
            if 'selected: true' in tc:
                tc = tc.replace(', selected: true', '')
                tc = tc.replace('selected: true, ', '')
                tc = tc.replace('selected: true', '')
                write_file(test_path, tc)
        
        commit("fix: remove selected prop from options, use React defaultValue pattern instead")
        print("  ✅ Removed selected prop from SelectOption")

    elif comp == 'CharacterCount':
        content = read_file(comp_tsx)
        # Fix aria-describedby order: hint/error first, then info
        content = content.replace(
            "aria-describedby={[\n            infoId,\n            ...insertIf(!!hint, hintId),\n            ...insertIf(!!errorMessage, errorId)\n          ].join(' ')}",
            "aria-describedby={[\n            ...insertIf(!!hint, hintId),\n            ...insertIf(!!errorMessage, errorId),\n            infoId\n          ].join(' ')}"
        )
        write_file(comp_tsx, content)
        commit("fix: reorder aria-describedby to list hint and error before character count info")
        print("  ✅ Fixed aria-describedby order")

    else:
        print("  ✅ as string casts removed (no component-specific fixes needed)")

print("\n=== ALL FIXES COMPLETE ===")
