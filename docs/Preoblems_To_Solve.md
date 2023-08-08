## Current

- "app" icon for widgets.
- "locate" icon for coordinate
- "file-tray" for projects

# 1 - GPS coordenate for each widget

- Problem:
  - This hurts the principle of widgets, where the user add widgets for each purpose.

# 2 - Warning when user add data info from 2 geographical places far away from each other

- Problem:
  - For this to be implemented, each widget must have it's own gps coordenate. This hurts the principle of widgets, where the user add widgets for each purpose.

# 3 - Data Export:

- Estudy ways to export data:
  - Some of interest are CSV, word, PFF and Email

# 4 Server communication:

- App must be able to receive a ProjectDTO from external servers, and parse this data.
- App must be able to post a ProjectDTO to a external server, so the server can filter the data whatever he wants.
- A screen to define the JSON body of both GET and POST request must be created.
  - This screen is dedicated for people who know a programming.