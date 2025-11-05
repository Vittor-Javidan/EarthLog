# ✅ 2.4.0

- New:
  - MapLayer
  - Added a button to open GPSInput coordinates on google map
  - Added map access subscriptions
  - Added sponsorship subscriptions

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