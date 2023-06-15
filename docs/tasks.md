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

## storage service

+ implement local storage service

## config service

- implement a config service
    - must save on local storage a default config data when app first load
    - user the local storage service to write and read
        - local storage config data must be parsed into a DTO

## internationalization service

- create a internationalization service
    - must save on local storage when a new language is setted
