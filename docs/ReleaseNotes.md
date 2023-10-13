// Before any commit, use the command line: tsc --noEmit

# 0.1.5.1 Download/Upload status

- Added status prop to SamplesSettings and WidgetData types.
- status 'first upload' changed to 'new'
- status prop cannot be undefined anymore.
- Any new data or new project has all its elements marked as 'new'
- Now during donwload, after confirmation, all project elements inherit the same status as the projectSettings.status.
- Now after a successfully upload, all project elements are marked as 'uploaded'.
- Projects copied from the project rule 'allowMultipleDownloads' now have its status as 'new'
- <LC.LastProjectButton /> on <HomeScreen />: Height changed from 45 to 55, and added verticalPadding of 5.