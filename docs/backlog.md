# refactoring:

- high Priority:
    - Move all types to the same file

- low Priority:
    - increase the button size for adding item on <OptionInput />, <SelectionInput /> and <PictureInput />
    - Add all major zIndez inside the gloal zIndex file
    - Remove all double `HapticsService.vibrate`. And leave this only on `onPressIn` events
    - Add `HapticsService.vibrate` for all buttons missing vibrations
    - Reorganize the checkup list into files

# features:

- Measurement change popup translations

- Compass:
    - implement stereogram display

- Screens:
    - Add a Credits Screen, with all libraries, open source creators and users that helped directly or indirectly for the project to be possible

- Project Widget:
    - Project Area reference

- Map:
    - implement a markers placement on map for <Pictures /> and <Measurements />
    - Implement filters to hide or show samples on Map Project Scope

- Server Rules:
    - Add a blockDeletion sample rule
    - Add a required boolean option on all inputs (If this option is true, the project will not be allowed to be uploaded to any server until the input is fullfilled)
    - Add a rule to retrict which inputs can be added to a specific widget
    - Regex validation on Text Input (to simplify server business logic on serverside). (If required is setted true, and exists a regex, the project will not allowed to be uploaded until the regex validate the data)
    - Add a rule to on GPSInput to chose between: 'altitude only', 'coordinate onyly', 'coordinate and altitude', where the user cannot change this.

- Inputs:
    - Marker Input:
        - A simple imput that allow the user to place a marker on the map with a desccription, to register points of interest.
        - Need to specialize markers into distinct categories (eg: measurement, urban structures, usefull icons) for better data organization.
    - Poligon input:
        - 1. If the poligon has one point, it must be represented as a normal GPS coordinate on the map, with the accuracy radius.
        - 2. If the poligon has two points, it must be represented as a line on the map,  with the accuracy radius on both extremes.
        - 3. If the poligon has more than 2 points, hide the accuracy radius, and draw a poligon on the map.
    - Line input
    - Phone Input
    - Date  Input
    - Audio Input
    - Video Input

- Camera:
    - implement quality camera options
    - implement flah auto option

- GPS:
    - implement a Tracking system

- Project Type:
    - implement a new type of project that just have one sample
        - instead loading the sample list, it will load all sample widgets directly
