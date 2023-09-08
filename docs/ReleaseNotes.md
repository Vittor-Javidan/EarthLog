# 0.1.1.16 GPSInput, autosave and Screen architecture

- A new Alert Component was created. Its a component layer on top of Layout Root, wich has indepenly render to support Component API pattern.
- All Screens with settingsInput and Widget Unit had their state unify and useAutosave redesign. Necessary to fix any future issue with data changing and dependency array not updating.
- New Translations added to GPSInput

[id_project] screens and its children:
- API/TC/LC architecture implemented.