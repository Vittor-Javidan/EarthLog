# ✅ 2.5.6
- Fix:
  - Compass input pin button showing on template widgets


# ✅ 2.5.5
- New:
  - Measures can now be pinned inside the map
  - When tutorial mode is anabled, now it shows a notification on the bottom right corner of the screen, to remind users tutorial mode is on.
  - Tutorial mode now can persists.

- Critical Fix:
  - Sometimes compass avg calculations were incorrect.

- fix:
  - Map Layer openning instead of closing when pressing the android back button sometimes.

- Codebase:
  - Map markers refactored, to allow the implementation of future features, like measurement map markers and poligons drawing on map.


# ✅ 2.5.4
- New:
  - Map Tutorial
  - Now layer buttons hide when menu opens
  - Layout improvements:
    - Now android back buttons close menus when they are open
    - Menus now have a small icon to indicate wich menu they are

- Fix:
  - Subcription screen not having a loading indicator while connecting to Play Store
  - Subscription icon card no proper aligned


# ✅ 2.5.3
- New:
  - Map Markers Selection Layer
    - Now markers can be selected from <CompassInput />
    - Added new colors for markers

- Fix:
  - Home Drawer translation: Subscription button was not translated


# ✅ 2.5.2

- New:
  - Compass Input
    - Added translations
    - Added new compass type dedicated for measurements
    - Added CSV export for compass measurements
    - Added measurements on DOCX export
  - Bubble Level Compass:
    - Added a small tutorial teaching how to use the bubble level compass.
  - Bug fix:
    - Many components going outside the screen on newest android versions.


# ✅ 2.5.1

- New:
  - Bubble Level compass: Now uses 2 acceleromenter axis to compute pitch and roll, improving stability and precision.
  - Added translations for Map and Compass layers

- fix:
  - Bubble Level compass: Fixed jumpy animation when crossing the 0/360 degrees boundary, and being unstable at 90 degrees pitch.


# ✅ 2.5.0

- new:
  - Added compass
  - Added a guiding system to help user keep the compass on horizontal through vibrations
  - Added bubble compass, to measure surfaces angles


# ✅ 2.4.2

- new:
  - Added new markers to maps
  - Now <GPSInput /> shows current coordinates when manual input is open
  - Tutorial Mode
    - If enabled, all coordinates are masked with a random number. Made for record or streaming purpose.
  - Automatic reference coordinates
  - Project and Sample reference GPS:
    - Reference coordinate is green when bellow 30 meters, yellow bellow 100 meters, and red above 100 meters.

- bug fix:
  - <MapLayer />: Infinite button loading when pressing the button to acquire the current position, when closing the map before getting the coordinate.
  - GPS data not respecting the Altitude/Coordinate checkbox when pressing one click position acquisition


# ✅ 2.4.1
- Map UI fix
  - No more UI behind Android buttons


# ✅ 2.4.0

- New:
  - MapLayer
  - Added a button to open GPSInput coordinates on google map
  - Added map access subscriptions
  - Added sponsorship subscriptions
  - All coordinates shows as markers inside the map
    - If you are on project screen, when opening the map, all coordinates inside the project will be shown
    - If you are on sample screen, when opening the map, only the coordinates of the sample will be shown
    - If you are on Home Screen, when opening the map, no coordinate will be shown other than the user last know location

- Codebase:
  - Routes architecture changed
    - Created a folder called scopes
      - All Screens for each scope are now inside their respective scope parents


# ✅ 2.3.3

- New:
  - Added a button to open GPSInput coordinates on google map


# ✅ 2.3.2

- New:
  - GPS Input now blinks during GPS acquisition, to visual alert users the GPS still open.


# ✅ 2.3.1

- Codebase fix:
  - Added imageQuality as a dependency on `onExport` ExportProject_DOCX module.


# ✅ 2.3.0

- New:
  - Zip and Export all project images


# ✅ 2.2.0

- New:
  - Exported files screen
    - Now every file exported is saved inside the device, allowig users to export the same file many time as need, without the need to build those files from scratch.


# ✅ 2.1.2

- New:
  - <GPSInput />: Added a option to get current position in one click
    - is meant to be used when accuracy is not that important, since this mechaninc is the classic one click acquision GPS, and it just throw the first coordinate found by the GPS phone device.

- Codebase:
  - Removed ExportService


# ✅ 2.1.1

- Fixed Screen Title being too small on the lastest android versions
- Fixed cancel button icon of <DeleteSwipeButton /> being outside the button
- Fixed screen buttons not being clickable after change screens by clicking in the screen carousel.
  - React Native animations does not allow interaction on buttons while the animation is happening. The spring animation was changed for a timing animation, removing the bounce.


# ✅ 2.1.0

- New button added on <HomeScope /> menu: "Release Notes", to allow users to see what changed easier


# ✅ 2.0.69

- Fixed a UI bug where widgets could flick if you change wich display you were using


# ✅ 2.0.68

- Now in case DOCX export fails, the summary of the error will be displayed
- Added translations strings for DOCX feedback


# ✅ 2.0.67

- UI Changes:
  - <PictureInput /> download all picture buttons icon changed

- Fix:
  - Share button does not show anymore for pictures that are missing

- Refactoring:
  - <PictureInput /> picture index removed from the carousel to the main component.
    - It seens both picture data and index must stay in the same scope to avoid desync errors


# ✅ 2.0.66

- Fix:
  - <SelectionInput /> data values not being copied from widget templates 


# ✅ 2.0.65

- Fix:
  - Preview Theme Widget Screen not scrooling


# ✅ 2.0.64

- New project rule added:
  - `uploadToURL: string`


# ✅ 2.0.63

- New project rule added:
  - `sendSyncDataOnlyOnce: boolean`


# ✅ 2.0.62

- New project rule added:
  - `enableResetSyncData: boolean`


# ✅ 2.0.61

- Added a reset sync data button
- Added the theme properties:
  - drawerButton.font_wrong
  - drawerButton.background_wrong
  - drawerButton.font_confirm
  - drawerButton.background_confirm


# ✅ 2.0.60

- Now sync data removes unnecessary `"deleted"` picture entries after all media is uploaded. To keep the sync data clean.