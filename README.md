## Action PR Validator
Actions to enforce PR with predefined rules branch name, title.
## Usage
See [action.yml](./action.yml)
```yaml
steps:
- uses: oDoVanNam/action-pr-validator@main
  with:
    title_regex: '#[0-9]+:? .+' # Regex that combines with prefix to enforce rules. Eg: Feature #<ticket_id>: short info.
    branch_regex: '^(feature|hotfix)/?.+'
    allowed_prefixes: 'Feature,Hotfix,Bugfix,Revamp' # Predefined prefix should match.
```

### Note:
See [pr_validator.yml](./.github/workflows/pr_validator.yml)

Ensure to add `types` to the Pull Requests webhook event.
[Readmore](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#pull_request).
```yaml
on:
  pull_request:
    types: [opened, edited, reopened]
```
