// Before any commit, use the command line: tsc --noEmit

# 0.1.4.2 Big Refactor

- Autosaves moved from input to widgets.
- Fixed GPS manual input not updating the gpsWatcher.
- Fixed the GPS watcher not deleting info when toggled during GPS data gattering.
- Added a if statement inside the threshold respected callback from reference checker, to avoid unecessary rerenders.
- All WidgetInputs optimized to not recreate functions everytime inputData changes.
- Credentials widget now uses only Widget Inputs.
- Added "secureTextEntry" prop to Widget String Input
- InputStatus type removed.
- added template rules to default widget data from Project Service.
- LogService.ts file renamed to DevToolsService.ts
- now Samples referenceGPS is received from <SampleInfoScreen />, and passed to <SampleDataScreen />, instead being a forced refresh by using the compoenent key prop.
- Screens from <SampleScope /> now uses memo hook.
- <ProjectInfoScreen /> "onSampleAliasChange" callback renamed to "onSampleAliasChange_Plural"
- All widget inputs now uses WidgetTheme by default.
- Functions that can't use memo hook was renamed to have a "F_" prefix. Example: <F_FunctionComponent />.
- removed all keys usage with the purpose of force rerender (except the one that rerender the root layout on Theme Scope).
- All Screen buttons now uses memo hook.
- all function calls inside components are now useCallbacks.