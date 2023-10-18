import { R_CredentialScreen } from './Screen/CredentialScreen';
import { R_HomeScreen } from './Screen/HomeScreen';
import { R_LanguageSelectionScreen } from './Screen/LanguageSelectionScreen';
import { R_ProjectInfoScreen } from './Screen/ProjectInfoScreen';
import { R_SampleInfoScreen } from './Screen/SampleInfoScreen';
import { R_SettingsScreen } from './Screen/SettingsScreen';
import { R_Widget } from './Widget/Root';
import { R_Button } from './component/Button';
import { R_Layout_PseudoWidget } from './component/Layout/PseudoWidget';
import { R_Alert_CreateProject } from './component/Alert/CreateProject';
import { R_Alert_CreateSample } from './component/Alert/CreateSample';
import { R_Alert_ExitApp } from './component/Alert/ExitApp';
import { R_Alert_Shared } from './component/Alert/__Shared__';
import { R_Alert_TemplateWidgetCopy } from './component/Alert/TemplateWidgetCopy';
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
import { R_Alert_UploadProject } from './component/Alert/UploadProject';
import { R_Alert_DownloadProjects } from './component/Alert/DownloadProject';
import { R_FetchAPIService } from './APIService/FetchAPIService';
import { R_ThemeScope } from './scope/ThemeScope';
import { R_WidgetThemePreview } from './Screen/WidgetThemePreview';
import { R_AppThemes } from './Themes/AppThemes';
import { R_WidgetThemes } from './Themes/WidgetThemes';
import { R_DateAndTimeScope } from './scope/DateAndTimeScope';
import { R_DateFormatScreen } from './Screen/DateFormatScreen';
import { R_TimeFormatScreen } from './Screen/TimeFormatScreen';
import { R_DataProcessService } from './APIService/DataProcessService';
import { R_ProjectService } from './service/ProjectService';
import { R_ExportProjectScope } from './scope/exportProjectScope';
import { R_Screen_ExportProject } from './Screen/ExportProjectScreen';
import { R_Alert_ExportProject_DOCX } from './component/Alert/ExportProject_DOCX';
import { R_FileExportModules_Shared } from './FileExportModules/__Shared__';

export const translations = {
  FileExportModules: {
    share:                    R_FileExportModules_Shared,
  },
  APIServices: {
    fetchAPIService:          R_FetchAPIService,
    dataProcessService:       R_DataProcessService,
  },
  service: {
    cacheService:             R_CacheService,
    databaseService:          R_DatabaseService,
    projectService:           R_ProjectService,
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
    themeScope:               R_ThemeScope,
    dateAndTime:              R_DateAndTimeScope,
    exportProject:            R_ExportProjectScope,
  },
  screen: {
    homeScreen:               R_HomeScreen,
    LanguageSelectionScreen:  R_LanguageSelectionScreen,
    projectInfoScreen:        R_ProjectInfoScreen,
    sampleInfoScreen:         R_SampleInfoScreen,
    settingsScreen:           R_SettingsScreen,
    credentialScreen:         R_CredentialScreen,
    widgetThemePreview:       R_WidgetThemePreview,
    dateFormatScreen:         R_DateFormatScreen,
    timeFormatScreen:         R_TimeFormatScreen,
    exportProject:            R_Screen_ExportProject,
  },
  component: {
    alert: {
      shared:                 R_Alert_Shared,
      templateWidgetCopy:     R_Alert_TemplateWidgetCopy,
      exitApp:                R_Alert_ExitApp,
      createSample:           R_Alert_CreateSample,
      createProject:          R_Alert_CreateProject,
      uploadProject:          R_Alert_UploadProject,
      downloadProjecs:        R_Alert_DownloadProjects,
      exportProeject_DOCX:    R_Alert_ExportProject_DOCX,
    },
    button:                   R_Button,
    layout: {
      pseudoWidget:           R_Layout_PseudoWidget,
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
  themes: {
    appThemes:                R_AppThemes,
    widgetThemes:             R_WidgetThemes,
  },
};
