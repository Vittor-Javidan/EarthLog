# features:

- implement compassUI (Magnetometer)
- implement geologic compass (Magnetometer for direction, gyroscope for inclination)
- implement compass compass manual fine ajustment system (to reduce device manetometer drift)

- Poligon input:
    - 1. If the poligon has one point, it must be represented as a normal GPS coordinate on the map, with the accuracy radius.
    - 2. If the poligon has two points, it must be represented as a line on the map,  with the accuracy radius on both extremes.
    - 3. If the poligon has more than 2 points, hide the accuracy radius, and draw a poligon on the map.

- Project Area reference

- Line input

- Implement filters to hide or show samples on Map Project Scope

- Add a blockDeletion sample rule

- Add a required boolean option on all inputs (If this option is true, the project will not be allowed to be uploaded to any server until the input is fullfilled)

- Add a rule to retrict which inputs can be added to a specific widget

- Regex validation on Text Input (to simplify server business logic on serverside). (If required is setted true, and exists a regex, the project will not allowed to be uploaded until the regex validate the data)

- Add a rule to on GPSInput to chose between: 'altitude only', 'coordinate onyly', 'coordinate and altitude', where the user cannot change this.

- Phone Input

- Date Input

- implement a new type of project that don't have samples

- implement quality camera options

- implement flah auto option

- implement a Tracking system

# refactoring:

- Add all major zIndez inside the gloal zIndex file
- Remove all double `HapticsService.vibrate`. And leave this only on `onPressIn` events
- Add `HapticsService.vibrate` for all buttons missing vibrations
- Utilize the Home Icon for every screen that is using arrow back to go to HomeScope
- Reorganize the checkup list into files