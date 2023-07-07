# 0.1.0.0

# MVP Requirements (When Requirements is done, the app is read to be published on play store)

- Users must be able to:
    - use the app in field
    - export saved data to email and localy

## Layout

+ Build a basic layout
    + Build a navbar
        + must have a title
        + must have a menu button to toggle the drawer
    + build a content area
        + must accept the children directly from <Layout /> tag
    + Build a footer
        + must have the app version
    + Build a drawer
        + must be on toggled when menu button is clicked
        + must accept drawer buttons as children
    + Build a drawer button

+ User the layout to construct a main screen
    + navbar title: Earth Log
    + footer: app version

## Storage Service

+ implement local storage service

## Config Service

+ implement a config service
    + it return a default config when no config is saved on local storage
    + uses the local storage service to write and read the current config
        + local storage config data must be parsed into a DTO

## Screen Button

+ Create a button to be display on any screen. This button must be generic.

## Internationalization

+ Add a translation file for each screen
+ Add a button to choose a language
    + when a language is choosed, it must be saved on local storage using Config service.

## Basic Config Screen

+ Must implement a button on MainScreen Layout to navigate to Config Screen before
+ Must have a button to redirect to a language selection screen
    + The language selected must be green

## All Config Screens

+ Must have go back button 

## App Version

+ Must be inside the Drawer Menu

## Customization

+ User must be able to select the colors he wants for each situation:
    + background
    + onBackground
    + primary
    + onPrimary
    + secondary
    + onSecondary
    + terciary
    + onTerciary
    + onPressColorPrimary
    + confirm
    + onConfirm
    + modified
    + onModified

+ A input component must be created.
    + it must have a place to type a value.
    + it must have a button to confirm
    + it must have a widget to fast color pick

+ A button to restore to default values.
+ Reset does not exit the settings
+ Optmize performance
+ Lock preview option.
+ Clean the style.

## MenuIcon

+ It must open a drawer when on MainScreen
+ it must show a goBack button when inside other pages
+ All buttons dedicated just to go back must be deleted

## Navigation Tree

+ A navigation tree must be implemented bellow the navbar
+ The tree must show:
    + The current Route dept, for example: ProjectScreen > SettingsScreen > ThemeScreen
    + when clicked, the user must be redirected to the route clicked
+ when ProjectScreen is being seeing, the navbar tree must be hidden.
+ Remove Back Button, and replace it to a Icon that represents the current Screen

## Bug Fix

+ Find a way to discart changes on theme screen when the native phone back button is clicked.

## Project Creation Logics

- When user createst a new project, he must be redirect to a project screen creation
- On this screen must have a single field: "project name"
- Bellow the project name field, must have a button "Add a new field"
    - this new field allow the user to add any relevant information about the project.
    - user can add many info as he wants.
    - 3 basics type fields must exist: boolean, number, string
    - When user saves the project:
        - all info, EXCEPT the project's name, must be saved on project_info database row field. 
        - User must be asked if he wants to save a template for later usage.

## Screens Helper

- When outside the MainScreen, when all other screen has its Navbar Button Presses, an explanation about the screens must be shown inside the drower.

## Project Creation Screen

- Before go to Creation Screen:
    - Project screen creation must happen on the Main Screen
    - A button to create a project inside Main Screen is needed
        - when the button is clicked:
            - user must be redirected to a Project Creation Screen

- When inside Creation Screen:
    - The Screen must ask if user wants to use an empty template, or a saved one.
        - an empty template is the one with only project name field available, with the button to add a new field.
        - 

    - Add new field Button:
        - when create a new field, the user must choose between 5 types:
            - boolean
            - string
            - number
            - coordinate
            - date
    - after the type is choosed, a new field will pop to user bellow the last field, so he can put any info he wants.
    - When all fields is filled, the user is allow to click the button "Finish"

    - Finsh Button:
        - when clicked, user must choose if he wants to save the created fields as a template for future projects.
        - If he chooses to, the object with a key-value pair of keys being the field label, and the value being the data type, must be saved inside the table of project info templates.
        - The project must be saved inside projects table as well.

## Project Edit Screen

- Before go to Project Edit Screen:
    - Inside Main Screen:
        - A icon button representing an edit option must show on each project button loaded from projects table.
        - When clicked, the user must be redirected to Project Edit Screen

- When Inside Project Edit Screen:
    - Must the same fields as choosed when the project was created, to allow the user modified, add or delete pre-existed fields.

    - Finish Button:
        - when clicked, user must choose if he wants to save the created fields as a template for future projects.
        - If he chooses to, the object with a key-value pair of keys being the field label, and the value being the data type, must be saved inside the table of project info templates.
        - The project must be saved inside projects table, by UPDATING using the cod_project of the projects.

    - A Red Delete Button, representing a Danger Zone must exist on Bottom.
        - When clicked, the user must type the same projects name as the current one being edit, regardless of upper or lower case.
        - When type correcly, the project will be deleted from database and user will be redirected to Main Screen.
        - When typed wrong, nothing will happen, and the user must click on the delete button again to try type again.

## Database

- Implement a database conection
- Create the following tables:
    - Projects Info Template:
        - cod_project_info_template: number
        - template_name: string
        - template: Object stringfied
    - Projects Table:
        - table name must be projects_table
        - cod_project: number
        - project_name: string
        - project_info: Object stringfied
    - Points Table:
        - table name must be on format: <cod_project>
        - cod_point: number
        - point_name: string
        - point_info: Object stringfied
    - Widgets Table:
        - table mame must be on format: <cod_project>_<cod_point>
        - widget_cod: number
        - widget_type: string
        - widget_info: Object stringfied