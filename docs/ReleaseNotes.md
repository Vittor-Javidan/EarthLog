// Before any commit, use the command line: tsc --noEmit

# 0.1.5.2 Project elements status update

- Added methods on cache service to avoid unecessary loading of all elements again when a deletion ocurs.
- Updating/Creating/Deleting any elements now causes status to update (parents data included)
- Fix a desync on status caused by elements copying sample and project settings from the cache, causing multiple sources of data modifications. Now everytime a settingsWidget autosave, it checks if the cache have its status desync.