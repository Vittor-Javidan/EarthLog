# ✅ 1.14.0

- New:
  - MapLayer
  - Added a button to open GPSInput coordinates on google map

- Codebase:
  - Routes architecture changed
    - Created a folder called scopes
      - All Screens for each scope are now inside their respective scope parents


# ✅ 1.13.2

- New:
  - GPS Input now blinks during GPS acquisition, to visual alert users the GPS still open.


# ✅ 1.13.1

- Codebase fix:
  - Added imageQuality as a dependency on `onExport` ExportProject_DOCX module.


# ✅ 1.13.0

- New:
  - Zip and Export all project images


# ✅ 1.12.0

- New:
  - Exported files screen
    - Now every file exported is saved inside the device, allowig users to export the same file many time as need, without the need to build those files from scratch.


# ✅ 1.11.2

- New:
  - <GPSInput />: Added a option to get current position in one click
    - is meant to be used when accuracy is not that important, since this mechaninc is the classic one click acquision GPS, and it just throw the first coordinate found by the GPS phone device.

- Codebase:
  - Removed ExportService


# ✅ 1.11.1

- Fixed Screen Title being too small on the lastest android versions
- Fixed cancel button icon of <DeleteSwipeButton /> being outside the button
- Fixed screen buttons not being clickable after change screens by clicking in the screen carousel.
  - React Native animations does not allow interaction on buttons while the animation is happening. The spring animation was changed for a timing animation, removing the bounce.


# ✅ 1.11.0

- New button added on <HomeScope /> menu: "Release Notes", to allow users to see what changed easier


# ✅ 1.10.82

- Fixed a UI bug where widgets could flick if you change wich display you were using


# ✅ 1.10.81

- Now in case DOCX export fails, the summary of the error will be displayed
- Added translations strings for DOCX feedback


# ✅ 1.10.80

- UI Changes:
  - <PictureInput /> download all picture buttons icon changed

- Fix:
  - Share button does not show anymore for pictures that are missing

- Refactoring:
  - <PictureInput /> picture index removed from the carousel to the main component.
    - It seens both picture data and index must stay in the same scope to avoid desync errors


# ✅ 1.10.79

- Fix:
  - <SelectionInput /> data values not being copied from widget templates 


# ✅ 1.10.78

- Fix:
  - Preview Theme Widget Screen not scrooling


# ✅ 1.10.77

- New project rule added:
  - `uploadToURL: string`


# ✅ 1.10.76

- New project rule added:
  - `sendSyncDataOnlyOnce: boolean`


# ✅ 1.10.75

- New project rule added:
  - `enableResetSyncData: boolean`


# ✅ 1.10.74

- Added a reset sync data button
- Added the theme properties:
  - drawerButton.font_wrong
  - drawerButton.background_wrong
  - drawerButton.font_confirm
  - drawerButton.background_confirm


# ✅ 1.10.73

- Now sync data removes unnecessary `"deleted"` picture entries after all media is uploaded. To keep the sync data clean.


# ✅ 1.10.72

- Small refactory to add `lts_version` propertie inside `projectSettings` only whe the propertie is actually missing during upload