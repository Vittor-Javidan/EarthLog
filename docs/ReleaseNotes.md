// Before any commit, use the command line: tsc --noEmit

# 0.1.2.4 Part 2: New Widget Implementation

- Old Services versions deleted and replaced by the new ones.
- Button removed from <Layout />
- Icon removed from <Layout />
- Text removed from <Layout />
- Now there 2 types of inputs: <WidgetInput /> and <Inputs />. The difference is that WidgetInput saves the data state and gives save signal to Widgets or PseudoWidgets.
- ScreenButtons are now smaller and centered on the bottom of the screens. Buttons limit removed as well.
- ProjectSettingsWidget and SampleSettingsWidget are now pseudo Widgets.
- Alert Modal StringInput do not share same components as Widget and Pseudo Widgets Inputs
