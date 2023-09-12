# Screen Architecture (8 September 2023)

Each screen can have 3 private folder:
- __API__: APIs that follow the Component API pattern, defined and created by this project.
- __TC__: Stands for "Template Components", wich are components usually defined by a Boylerplate component, and they *MUST* have consistent code style across all Screens.
- __LC__: Stands for "Local Components", these are components created exclusively for the screen who have then.

All other folders are children screen, wich necessary follows the flow of the *navigation tree*.
Each screen have on its root a index file responsable to have the <Layout.Root /> components, wich mounts all other main components toguether.
