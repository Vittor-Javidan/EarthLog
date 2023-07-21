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

+ When user create a new project, he must be redirect to a project screen creation
+ On this screen must have all required fields: "Immutable: boolean, ID: string, Name: string"
- Bellow the project name field, must have a button "Add a new field"
    - 3 basics type fields must exist: boolean, number, string
        + string
        + number
        + boolean
    + this new field allow the user to add any relevant information about the project.
    + user can add many info as he wants.
+ Normalize all fonts sizes.

## 1 - Database

- Create a Database with the following tables:
    - projects
        - id_project: string
        - name: string
        - immutable: boolean
        - rules: stringfied javascript object
    - samples
        - id_project: string
        - id_sample: string
        - name: string
        - rules: stringfied javascript object
    - project_widgets
        - id_project: string
        - id_widget: string
        - type: string
        - name: string
        - value: any
        - rules: stringfied javascript object
    - samples_template
        - id_project: string
        - id_widget: string
        - type: string
        - name: string
        - value: any
        - rules: stringfied javascript object
    - samples_widgets
        - id_project: string
        - id_sample: string
        - id_widget: string
        - type: string
        - name: string
        - value: any
        - rules: stringfied javascript object

- Create a Database service.
- Implement methods on Project Service to interact with Database Service.
    - Create Project
    - Update Project
    - Delete Project
    - Create Sample
    - Update Sample
    - Delete Sample
    - Create widget (for project, template and sample)
    - Update widget (for project, template and sample)
    - Delete widget (for project, template and sample)

## 2 - Basic Screens

- Implement project creation to Project Creation Screen confirm button.
- Show all available projects on HomeScreen
    - Show last openned project.
    - All projects must have an edit button.
- New Screens needed:
    - Project Edit Screen
        - Show the project settings that are allow to be edited.
        - Show delete input option, no rules are required here.
    - Project Screen
        - Show all samples available
        - All samples must have an edit button
        - Must show a button to create a new sample, if rules allow.
    - Sample Edit Screen
        - Show the sample settings that are allow to be edited.
        - Show delete input option, if the rules allow.
    - Sample Screen
        - Show all widgets inside the sample.
        - Must show a button to create a new widget, if rules allow.