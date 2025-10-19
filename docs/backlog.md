# Expo camera

## refactoring:
- All file system calls are now syncronous. Fix the unecessary async calls
- clean all redudant styles on all JSX components
- Rename AlertService to PopUpService
- Rename Default vibration to "all clicks"
- Rename CSV export to "CSV (all coordinates)"

## features:
- implement quality camera options
- implement flah auto option
- implement a new DOCX export, with images
- implement compassUI and compass input (Geologic and Normal)
- implement a new type of project that only has one sample