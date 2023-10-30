// Before any commit, use the command line: npx tsc --noEmit

# 0.1.9.17 Services Architecture refactor

- In order to accomodate media sync and prevent some heavy future technical debt, some services was heavily refactored.
- Now sync file updates happens on database level, right after file manipulation. UI does not handle this anymore.
- Widget manipulation methods generalized into a single definition.
- Widget sync methods generalized into a single definition
- Now configDTO used by project service is through dependency injection.
- Now configDTO used by data process service is through dependency injection.
- Now configDTO used by Cache service is through dependency injection.
- Cache service no longer knows about Sync Service.