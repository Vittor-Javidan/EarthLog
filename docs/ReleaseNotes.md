// Before any commit, use the command line: npx tsc --noEmit

# [1,2] Fix: type projectSetting

- Removed the status propertie
- Now All sync logics stay withing the SyncService and Sync files. The ProjectDTO does not need to know it's own state anymore
- Fixed a introduced bug where downloaded projects without lts_version propertie could be downloaded on LTS_Version 2
