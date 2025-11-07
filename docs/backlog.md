# features:

- Implement filters to hide or show samples on Map Project Scope

- Creat custom icon assets and use then to represents distinct type of data inside the map, instead using markers
    - A person icon for last know location
    - A folder icon for project reference coordinate
    - A clipboar icon for sample reference coordinate
    - Find a good icon for widget coordinates

- Add a blockDeletion sample rule

- Add a required boolean option on all inputs (If this option is true, the project will not be allowed to be uploaded to any server until the input is fullfilled)

- Add a rule to retrict which inputs can be added to a specific widget

- Regex validation on Text Input (to simplify server business logic on serverside). (If required is setted true, and exists a regex, the project will not allowed to be uploaded until the regex validate the data)

- Add gps acquisition option:

```
(property) mayShowUserSettingsDialog?: boolean | undefined

Specifies whether to ask the user to turn on improved accuracy location mode which uses Wi-Fi, cell networks and GPS sensor.

@default

true
@platform — android
```

- Phone Input

- Date Input

- implement compassUI and compass input (Geologic and Normal)

- implement a new type of project that don't have samples

- implement quality camera options

- implement flah auto option

# refactoring:

- Remove all double `HapticsService.vibrate`. And leave this only on `onPressIn` events
- Add `HapticsService.vibrate` for all buttons missing vibrations
- Utilize the Home Icon for every screen that is using arrow back to go to HomeScope