// Before any commit, use the command line: npx tsc --noEmit

# 1.9.29 Image download

- No more possible do upload a image that does not exist on user device.
- Added a new method "identifyMissingPicturesOnCache" on Cache Service. Responsible to identify pictures not available on user device.
- New Alert Local component abstracted: <CredentialsDisplay />
- New Alert Local component abstracted: <ErrorDisplay />
- New Alert Local component abstracted: <TemplateWidgetCopyDisplay />
- Removed the method changeAllIds from Project Service.
- Download Service downloadPictures method now breaks the fetch if the proccess is aborted.
- Database Service Media Sync now considers media download sync.