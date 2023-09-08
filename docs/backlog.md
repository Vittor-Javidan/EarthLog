# GPS:
- add GPS alert when sampleWigets coordinates go to far from sampleSettings coordinates.

# Add the new LC/TC archquitecture to all Screens ([id_project] and its children already implemented)

# fix the height for all widget labels and Project/Sample settings
- Add a minimum height of 40, and set All iconButtons to 40 height

# Boolean Input
  - Rename to True/False on UI, to be more user friendly.
  - Add a Not Applied option, using checkbox.

# Boolean Widget
  - instead implementing a switch, use the boolean input instead.

# add labels to all widgets main inputs

# implement the new <InputRoot /> on all Layout Inputs
# Refactor Custom text components, to be used like <Text p />, <Text h1 /> etc
# When <View /> is utilized on page screen components, use <Layout.View> or <Layout.Scrollview>. But when used on reuzable components, change those for the <View /> and <ScrollView /> from react-navite import
# Use <Layout.Icon /> only when necessary on Screen components. Otherwise, use Ionicons library directly.
# Normalize all Widgets code.