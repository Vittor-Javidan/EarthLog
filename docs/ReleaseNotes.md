// Before any commit, use the command line: tsc --noEmit

# 0.1.1.29 Widgets Refactor

- GPSWidget now has a modal file
- WidgetComponent Modal now has a gap of 10. All Widgets Modal have a <View /> with only gap 10 removed.
- All Widget modals now has a UtilityButtons component
- <WidgetComponent.Root /> children style simplified
- <WidgetComponent.Display /> removed for not being used
- <TextWidget /> and <BooleanWidget /> removed from Widget constant export. (There is no reason for then to be access directely if a <Selector /> already exists.)
- <AddButtonWidget /> internal Modal abstracted