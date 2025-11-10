# features:

- Tutorial Mode:
    - 1. Add tutorial mode for displayed coordinates inside the map.
    - 2. Add a button to turn on/off tutorial mode in app

- Automatic reference coordinates:
    - 1. Make the reference coordinate of samples automativ, to collect gps data if the GPS is empty, when the user opens the sample
    - 2. Add a switch to turn on/off this feature on project settings widget

- Project and Sample reference GPS:
    - 1. Rename the input label from `GPS` to `Reference Coordinates`
    - 2. Remove the minimum distance trigger to show the distance from the reference coordinates.
    - 3. Make the reference coordinate green if up to 30 meters, yellow if up to 100 meters, and red above 100 meters.

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

- implement compassUI and compass input (Geologic and Normal)

- implement a new type of project that don't have samples

- implement quality camera options

- implement flah auto option

- implement a Tracking system

# refactoring:

- Remove all double `HapticsService.vibrate`. And leave this only on `onPressIn` events
- Add `HapticsService.vibrate` for all buttons missing vibrations
- Utilize the Home Icon for every screen that is using arrow back to go to HomeScope
- Reorganize the checkup list into files