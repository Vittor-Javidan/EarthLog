// Before any commit, use the command line: tsc --noEmit

# 0.1.5.6 Download/Upload feedback display

- Implemented a feedback display for DownloadProject, UploadProject and CreateProject popUps
- now appAPI is called APIServices
- the service appAPI is now called FetchAPIService
- "changeAllIDs" method moved from Project Service to Data Process Service.
- "createSyncDataAfterDownload" moved from Sync Service to Data Process Service.
- "createSyncDataAfterDownload" renamed to "attachSyncData".
- removed the need for a configDTO on "getCurrentDateTime" on Date and Time Service.
- "buildProjectFromDatabase" moved from Project Service to Data Process Service
- Many popUps had their FootButtons abstracted into its own file