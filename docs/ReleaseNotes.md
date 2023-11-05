// Before any commit, use the command line: npx tsc --noEmit

# 0.1.9.25 Refactor

- DatabaseService.savePictureFromUri : now has a onSave Callback.
- <AppCamera />: Now adds picture amount feedback only if onSave callback is called.