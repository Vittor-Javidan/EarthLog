# A widget component must have only these props:

+ label
  - string type

+ widgetData
  - Each widget must have its own WidgetData designed exclusive for its needs.
    - The data must be an Object, with the first key-value pair defined as: 'type': 'arbitraryWidgetType'
      - This allow third parties to create logics to handle the data any way they want.

+ onConfirm callback event
  - All callbacks must return 2 arguments
    - first argument is the Widget Label, a string,
    - second argument is the Widget data, a WidgetData