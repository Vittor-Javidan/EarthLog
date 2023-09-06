# GPS:
- add Undo functionality for GPSInput and GPSWidget
- add GPS erase alert for Project, sample and widgets. (Not needed on creation screens)
- add GPS alert when sampleWigets coordinates go to far from sampleSettings coordinates.

# add labels to all widgets inputs
# add boolean input to BooleanWidget data display
# Move boolean data Translations to Input -> Boolean
# implement the new <InputRoot /> on all Layout Inputs
# Refactor Custom text components, to be used like <Text p />, <Text h1 /> etc
# When <View /> is utilized on page screen components, use <Layout.View> or <Layout.Scrollview>. But when used on reuzable components, change those for the <View /> and <ScrollView /> from react-navite import
# Use <Layout.Icon /> only when necessary on Screen components. Otherwise, use Ionicons library directly.
# Normalize all Widgets code.