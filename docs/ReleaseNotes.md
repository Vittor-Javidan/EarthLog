// Before any commit, use the command line: tsc --noEmit

# 0.1.2.6 Refactor

- __API__ removed from <HomeScreen />
- __APÌ__ removed from <ProjectInfoScreen />
- __APÌ__ removed from <ProjectScreen />
- __APÌ__ removed from <SampleScreen />
- __APÌ__ removed from <TemplateScreen />
- Removed some unecessary vibrations from Project and Sample creations alerts
- Added a new Wiget navbar button dedicated to edit Data Display. Now widget editing is not a toggle, but 2 separed navbar buttons.
- Widget delete button now stay on bottom right side of the wiget.
- Alert PopUps vertical gap decreased to 10
- Theme Scope and Theme Screen removed
- fix a bug where layout language was not changing in real time when <LanguageSelectionScreen /> changes language
- ThemeService renamed to FontService