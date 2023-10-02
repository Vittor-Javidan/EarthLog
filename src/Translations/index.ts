import { R_CredentialScreen } from './Screen/CredentialScreen';
import { R_HomeScreen } from './Screen/HomeScreen';
import { R_LanguageSelectionScreen } from './Screen/LanguageSelectionScreen';
import { R_ProjectInfoScreen } from './Screen/ProjectInfoScreen';
import { R_SampleInfoScreen } from './Screen/SampleInfoScreen';
import { R_SettingsScreen } from './Screen/SettingsScreen';
import { R_Widget } from './Widget/Root';
import { R_Alert } from './component/Alert';
import { R_Button } from './component/Button';
import { R_PseudoWidget } from './component/Layout/PseudoWidget';
import { R_NavController } from './global/navController';
import { R_CredentialScope } from './scope/CredentialSope';
import { R_HomeScope } from './scope/HomeScope';
import { R_LanguageScopeScope } from './scope/LanguageSelectionScope';
import { R_ProjectScope } from './scope/ProjectScope';
import { R_SettingsScope } from './scope/SettingsScope';
import { R_CacheService } from './service/CacheService';
import { R_DatabaseService } from './service/DatabaseService';
import { R_BooleanInput } from './widgetInput/BooleanInput';
import { R_GPSInput } from './widgetInput/GPSInput';
import { R_StringInput } from './widgetInput/StringInput';

export const translations = {
  service: {
    cacheService:             R_CacheService,
    DatabaseService:          R_DatabaseService,
  },
  global: {
    navigationController:     R_NavController,
  },
  scope: {
    homeScope:                R_HomeScope,
    languageSelectionScope:   R_LanguageScopeScope,
    projectScope:             R_ProjectScope,
    settingsScope:            R_SettingsScope,
    credentialScope:          R_CredentialScope,
  },
  screen: {
    homeScreen:               R_HomeScreen,
    LanguageSelectionScreen:  R_LanguageSelectionScreen,
    projectInfoScreen:        R_ProjectInfoScreen,
    sampleInfoScreen:         R_SampleInfoScreen,
    settingsScreen:           R_SettingsScreen,
    credentialScreen:         R_CredentialScreen,
  },
  component: {
    alert:                    R_Alert,
    button:                   R_Button,
    layout: {
      pseudoWidget:           R_PseudoWidget,
    },
  },
  widget: {
    Root:                     R_Widget,
  },
  widgetInput: {
    booleanInput:             R_BooleanInput,
    stringInput:              R_StringInput,
    gpsInput:                 R_GPSInput,
  },
};
