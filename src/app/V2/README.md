# App Folder Architecture (13 September 2023)

- This folder is used only to define Scopes, where components like <Layout.Root /> and <Layout.Carousel.Root /> are declared.
- <Layout.Root /> is responsable to render the base layout (navbar, backpress action, navigation tree, drawer, etc).
- <Layout.Carousel.Root /> is responsable to allow multiple screen to exist side by side inside the same scope.

# What is a scope, and what is it used for?

Scope is a context. This is where all data is initially loaded to update the app's cache, and where multiple screens can communicate with each other.

This is the place you're going to find:

- Cache fetch initialization.
- Phone physical buttons hooks.
- Drawer and NavigationTree buttons declarations.
- Anything that needs to be initialized that has a scope bigger than the screens.
