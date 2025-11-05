# features:

- Add markers on <MapLayer /> for all coordinates inside of the selected scope:
    - Home scope:
        - Only current position marker
    - Project scope:
        - All gps coordinates of the current project
    - Sample scope:
        - All coordinates of the current sample

- Add a blockDeletion sample rule

- Add a required boolean option on all inputs (If this option is true, the project will not be allowed to be uploaded to any server until the input is fullfilled)

- Add a rule to retrict which inputs can be added to a specific widget

- Regex validation on Text Input (to simplify server business logic on serverside). (If required is setted true, and exists a regex, the project will not allowed to be uploaded until the regex validate the data)

- Phone Input

- Date Input

- implement compassUI and compass input (Geologic and Normal)

- implement a new type of project that don't have samples

- implement quality camera options

- implement flah auto option

# refactoring:

- Utilize the Home Icon for every screen that is using arrow back to go to HomeScope