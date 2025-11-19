import { memo, useCallback, useState } from "react";

import { Scope } from "@V2/Globals/NavigationControler";

import { HomeScope } from "./Home";
import { CredentialScope } from "./Credential";
import { FileExploreScope } from "./FileExplore";
import { VersionChangeScope } from "./VersionChange";
import { ExportedFilesScope } from "./ExportedFiles";
import { SubscriptionsScope } from "./Subscriptions";

import { SettingsScope } from "./SettingsScope";
import { ThemeScope } from "./Theme";
import { DateAndTimeScope } from "./DateAndTime";
import { LanguageSelectionScope } from "./LanguageSelection";

import { ProjectScope } from "./Project";
import { SampleScope } from "./Sample";
import { ExportProjectScope } from "./ExportProject";
import { VibrationsOptionsScope } from "./VibrationsOptions";

import { ControllerAPI } from "./API/Controller";

export const ScopeController = memo(() => {

  const [currentRoute, setCurrentRoute] = useState<Scope>({ scope: 'HOME SCOPE' });

  ControllerAPI.registerScopeSetter(setCurrentRoute);

  const onScopeChange = useCallback((newRoute: Scope) => {
    setCurrentRoute(newRoute);
  }, []);

  return (<>
    {currentRoute.scope === 'HOME SCOPE'               && (<HomeScope              onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'CREDENTIAL SCOPE'         && (<CredentialScope        onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'VERSION CHANGE SCOPE'     && (<VersionChangeScope     onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'FILE EXPLORE SCOPE'       && (<FileExploreScope       onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'EXPORTED FILES SCOPE'     && (<ExportedFilesScope     onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'SUBSCRIPTIONS SCOPE'      && (<SubscriptionsScope     onScopeChange={onScopeChange}/>)}

    {currentRoute.scope === 'SETTINGS SCOPE'           && (<SettingsScope          onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'LANGUAGE SELECTION SCOPE' && (<LanguageSelectionScope onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'DATE AND TIME SCOPE'      && (<DateAndTimeScope       onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'THEME SCOPE'              && (<ThemeScope             onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'VIBRATION OPTIONS SCOPE'  && (<VibrationsOptionsScope onScopeChange={onScopeChange}/>)}

    {currentRoute.scope === 'PROJECT SCOPE'            && (<ProjectScope           onScopeChange={onScopeChange} id_project={currentRoute.id_project} />)}
    {currentRoute.scope === 'EXPORT PROJECT SCOPE'     && (<ExportProjectScope     onScopeChange={onScopeChange} id_project={currentRoute.id_project} />)}
    {currentRoute.scope === 'SAMPLE SCOPE'             && (<SampleScope            onScopeChange={onScopeChange} id_project={currentRoute.id_project} id_sample={currentRoute.id_sample} />)}
  </>)
});
