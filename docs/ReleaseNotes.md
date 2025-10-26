// Before any commit, use the command line: npx tsc --noEmit

# [1,2] Refactoring: Service Folders

- Added 3 types of service folder:
  - For app file handling
  - For general services
  - For core services (that only import external libraries)
- All services default exports removed