# 0.1.0.0

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

## Basic Config Screen

- Must implement a button on MainScreen Layout to navigate to Config Screen

- Must have a save button
    - save button saves the current config into local storage

- Must have a language select field
    - screens must have a translation file dedicated to it.
        - translations files must have only a constant with is an object with all laguages tags as main keys.
        - each language tag is a pair-value with the key representing the text in english, and the value the respective translation.

## Project Creation Screen

- Project screen must be the first screen

- A button to create a project is needed

- When create a new project, it must show the items as a list of projects
    - No need to implement data base yet.