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