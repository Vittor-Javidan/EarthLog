# Expo camera

## refactoring:
- All file system calls are now syncronous. Fix the unecessary async calls
- clean all redudant styles on all JSX components
- Rename AlertService to PopUpService
- Rename Default vibration to "all clicks"
- Rename CSV export to "CSV (all coordinates)"
- Change the Services folder architecture to something more specialized for the app development
- Make the Config being saved as a files, instead of using local storage

## features:
- implement a new DOCX export, with images
- implement a way to incentivize the users to update the app
- publish on Play Store, and make a few videos for Youtube
- implement quality camera options
- implement flah auto option
- implement compassUI and compass input (Geologic and Normal)
- implement a new type of project that only has one sample