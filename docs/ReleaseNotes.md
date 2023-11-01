// Before any commit, use the command line: npx tsc --noEmit

# 0.1.9.20 Bug fix and refactoring

- <ProjectWidgets /> and <TemplateWidgets /> are now memoized.
- All missing function components now uses memo. Only scope component do not use memo now.
- fixed a bug where last open project was not being considered on first app boot.
- Now loading state are isolated on Scopes, to garantee screen will receive always the most updated data on first render.