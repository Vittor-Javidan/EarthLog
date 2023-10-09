// Before any commit, use the command line: tsc --noEmit

# 0.1.4.1 Language Scope/Screen refactor
- LanguageButton "onLanguageSelected" renamed to "onLanguageChange"
- <LanguageButton /> abstracted from <LanguageButtons />
- <LanguageButtons /> now uses memo hook.
- <LanguagesSelectionScreen /> now uses memo hook.
