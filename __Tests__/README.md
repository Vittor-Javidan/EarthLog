# At the momment, no E2E framework was installed.





# Layout:

## <Layout.Root />
- Menu buttons click makes the <Drawer /> Component to animate to show or hide themselfs.

## <Layout.Button.Icon>
- Navigation Tree Icons changes background color when clicked.

## <Layout.Button.TextWithIcon />
- Drawer Buttons changes background color when clicked.

## <Layout.Input.GPS />
- When GPS pin is toggled, coordinates must change only when accuracy is better than before.
- When GPS pin is toggled, altitude must change only when accuracy is better than before.
- must show accuracy in real time.





# Screens:
## Home Screen:
- Layout Navigation Tree must show a <IconButton /> of a house.
- Settings Drawer Button redirects to <SettingsScreen />.
- New Project Button redirects to <ProjectCreationScreen /> 
- Clicking on <LastProjectButton /> redirects to <ProjectScreen />
  - <Layout.Root /> title must be the same as the button name clicked
- Clicking on <ProjectButton /> redirects to <ProjectScreen />
  - <Layout.Root /> title must be the same as the button name clicked.

## Settings Screen:
- Navigation Tree must have 2 Icon Button
  - 1: Redirects to Home Screen.
  - 2: Alerts the user about this being his current screen.
- Language Button Redirects you to Language Screen.
- Theme Button Redirects you to Theme Screen.
- Rounded Back Button Redirects to Home Screen.
- Native Phone Back Press Redirects to Home Screen.

## Language Screen
- Navigation Tree must have 3 Icon Button
  - 1: Redirects to Home Screen.
  - 2: Redirects to Settings Screen.
  - 3: Alerts the user about this being his current screen.
- Clicking on any Language Button, the app must change to the current language at real time.
- Rounded Back Button Redirects to Settings Screen.
- Native Phone Back Press Redirects to Settings Screen.

## Theme Screen:
- Navigation Tree must have 3 Icon Button
  - 1: Redirects to Home Screen.
  - 2: Redirects to Settings Screen.
  - 3: Alerts the user about this being his current screen.
- When Layout Menu Buttons is pressed, a Example Figure with the changings theme colors must be show.
+ Color Input:
  - if you type a valid color, the Example Figure must change in real time.
  - If value changes, the value background must show the choosen color.
  - When icon button is clicked, a color picker must be showed or hide.
  - if you slide your finder through the picker, the value must be update as well. 
  - if you slide your finder through the picker, the value background must be update as well.
  - if you slide your finder through the picker, the Example Figure must be update as well.
- When save button is clicked, saved the theme and redirect to Settings Screen.
- When Reset button is clicked, it must reset Example Figure and all Input Color Values.
- Rounded Back Button Redirects to Settings Screen.
- Native Phone Back Press Redirects to Settings Screen.
