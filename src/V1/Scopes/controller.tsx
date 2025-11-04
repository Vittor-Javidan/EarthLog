import { memo, useCallback, useState } from "react";

import { Scope } from "@V1/Globals/NavigationControler";
import { TestScope } from "@V1/Scopes/Test";

import { HomeScope } from "@V1/Scopes/Home";
import { CredentialScope } from "@V1/Scopes/Credential";
import { FileExploreScope } from "@V1/Scopes/FileExplore";
import { VersionChangeScope } from "@V1/Scopes/VersionChange";
import { ExportedFilesScope } from "@V1/Scopes/ExportedFiles";

import { SettingsScope } from "@V1/Scopes/SettingsScope";
import { ThemeScope } from "@V1/Scopes/Theme";
import { DateAndTimeScope } from "@V1/Scopes/DateAndTime";
import { LanguageSelectionScope } from "@V1/Scopes/LanguageSelection";

import { ProjectScope } from "@V1/Scopes/Project";
import { SampleScope } from "@V1/Scopes/Sample";
import { ExportProjectScope } from "@V1/Scopes/ExportProject";
import { VibrationsOptionsScope } from "@V1/Scopes/VibrationsOptions";

export const ScopeController = memo(() => {

  const [currentRoute, setCurrentRoute] = useState<Scope>({ scope: 'HOME SCOPE' });
  
  const onScopeChange = useCallback((newRoute: Scope) => {
    setCurrentRoute(newRoute);
  }, []);

  return (<>
    {currentRoute.scope === 'TEST SCOPE'               && (<TestScope />)}
    {currentRoute.scope === 'HOME SCOPE'               && (<HomeScope              onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'CREDENTIAL SCOPE'         && (<CredentialScope        onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'VERSION CHANGE SCOPE'     && (<VersionChangeScope     onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'FILE EXPLORE SCOPE'       && (<FileExploreScope       onScopeChange={onScopeChange}/>)}
    {currentRoute.scope === 'EXPORTED FILES SCOPE'     && (<ExportedFilesScope     onScopeChange={onScopeChange}/>)}

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
