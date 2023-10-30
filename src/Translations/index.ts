import { R_Screen_Credential } from './Screen/CredentialScreen';
import { R_Screen_Home } from './Screen/HomeScreen';
import { R_Screen_LanguageSelection } from './Screen/LanguageSelectionScreen';
import { R_Screen_ProjectInfo } from './Screen/ProjectInfoScreen';
import { R_Screen_SampleInfo } from './Screen/SampleInfoScreen';
import { R_Screen_Settings } from './Screen/SettingsScreen';
import { R_Widget_Root } from './Widget/Root';
import { R_Button } from './component/Button';
import { R_Layout_PseudoWidget } from './component/Layout/PseudoWidget';
import { R_Alert_CreateProject } from './component/Alert/CreateProject';
import { R_Alert_CreateSample } from './component/Alert/CreateSample';
import { R_Alert_ExitApp } from './component/Alert/ExitApp';
import { R_Alert_Shared } from './component/Alert/__Shared__';
import { R_Alert_TemplateWidgetCopy } from './component/Alert/TemplateWidgetCopy';
import { R_Global_NavController } from './global/navController';
import { R_Scope_Credential } from './scope/CredentialSope';
import { R_Scope_Home } from './scope/HomeScope';
import { R_Scope_Language } from './scope/LanguageSelectionScope';
import { R_Scope_Project } from './scope/ProjectScope';
import { R_Scope_Settings } from './scope/SettingsScope';
import { R_Service_Cache } from './service/CacheService';
import { R_Input_Boolean } from './widgetInput/BooleanInput';
import { R_Input_GPS } from './widgetInput/GPSInput';
import { R_Input_String } from './widgetInput/StringInput';
import { R_Alert_UploadProject } from './component/Alert/UploadProject';
import { R_Alert_DownloadProjects } from './component/Alert/DownloadProject';
import { R_Service_FetchAPI } from './APIService/FetchAPIService';
import { R_Scope_Theme } from './scope/ThemeScope';
import { R_Screen_WidgetThemePreview } from './Screen/WidgetThemePreview';
import { R_Themes_App } from './Themes/AppThemes';
import { R_Themes_Widget } from './Themes/WidgetThemes';
import { R_Scope_DateAndTime } from './scope/DateAndTimeScope';
import { R_Screen_DateFormat } from './Screen/DateFormatScreen';
import { R_Screen_TimeFormat } from './Screen/TimeFormatScreen';
import { R_Service_DataProcess } from './APIService/DataProcessService';
import { R_Service_Project } from './service/ProjectService';
import { R_Scope_ExportProject } from './scope/exportProjectScope';
import { R_Screen_ExportProject } from './Screen/ExportProjectScreen';
import { R_FileExportModules_Shared } from './FileExportModules/__Shared__';
import { R_FileExportModules_CSV } from './FileExportModules/CSV';
import { R_Input_Options } from './widgetInput/OptionsInput';
import { R_FileExportModules_DOCX } from './FileExportModules/DOCX';

export const translations = {
  FileExportModules: {
    share:                    R_FileExportModules_Shared,
    csv:                      R_FileExportModules_CSV,
    docx:                     R_FileExportModules_DOCX,
  },
  APIServices: {
    fetchAPI:                 R_Service_FetchAPI,
    dataProcess:              R_Service_DataProcess,
  },
  service: {
    cache:                    R_Service_Cache,
    project:                  R_Service_Project,
  },
  global: {
    navigationController:     R_Global_NavController,
  },
  scope: {
    home:                     R_Scope_Home,
    languageSelection:        R_Scope_Language,
    project:                  R_Scope_Project,
    settings:                 R_Scope_Settings,
    credential:               R_Scope_Credential,
    theme:                    R_Scope_Theme,
    dateAndTime:              R_Scope_DateAndTime,
    exportProject:            R_Scope_ExportProject,
  },
  screen: {
    home:                     R_Screen_Home,
    LanguageSelection:        R_Screen_LanguageSelection,
    projectInfo:              R_Screen_ProjectInfo,
    sampleInfo:               R_Screen_SampleInfo,
    settings:                 R_Screen_Settings,
    credential:               R_Screen_Credential,
    widgetThemePreview:       R_Screen_WidgetThemePreview,
    dateFormat:               R_Screen_DateFormat,
    timeFormat:               R_Screen_TimeFormat,
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
    },
    button:                   R_Button,
    layout: {
      pseudoWidget:           R_Layout_PseudoWidget,
    },
  },
  widget: {
    Root:                     R_Widget_Root,
  },
  widgetInput: {
    boolean:                  R_Input_Boolean,
    string:                   R_Input_String,
    options:                  R_Input_Options,
    gps:                      R_Input_GPS,
  },
  themes: {
    app:                      R_Themes_App,
    widget:                   R_Themes_Widget,
  },
};
