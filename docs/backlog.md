# Expo camera

## refactoring:
- All file system calls are now syncronous. Fix the unecessary async calls
- Rename AlertLayer to PopUpLayer
- Rename Default vibration to "all clicks"
- Rename CSV export to "CSV (all coordinates)"
- Make the Config being saved as a files, instead of using local storage
- clean all redudant styles on all JSX components

## features:
- Add a gps snapshot button on <GPSInput />, for those who just want to want click, in case accuracy is not that important
- Add a loading indicator for file explore when an item is clicked
- implement a new folder location to save exported documents, and allow their sharing
- implement an export of all images into a zip file
- implement a way to incentivize the users to update the app
- implement quality camera options
- implement flah auto option
- implement compassUI and compass input (Geologic and Normal)
- implement a new type of project that only has one sample