import { R_ErrorCodes } from './globals/ErrorCodes';
import { R_Screen_Credential } from './Screen/CredentialScreen';
import { R_Screen_Home } from './Screen/HomeScreen';
import { R_Screen_LanguageSelection } from './Screen/LanguageSelectionScreen';
import { R_Screen_ProjectInfo } from './Screen/ProjectInfoScreen';
import { R_Screen_SampleInfo } from './Screen/SampleInfoScreen';
import { R_Screen_Settings } from './Screen/SettingsScreen';
import { R_FileExportModules_Shared } from './FileExportModules/__Shared__';
import { R_FileExportModules_CSV } from './FileExportModules/CSV';
import { R_FileExportModules_DOCX } from './FileExportModules/DOCX';
import { R_Scope_Credential } from './scope/CredentialScope';
import { R_Scope_Home } from './scope/HomeScope';
import { R_Scope_Language } from './scope/LanguageSelectionScope';
import { R_Scope_Project } from './scope/ProjectScope';
import { R_Scope_Settings } from './scope/SettingsScope';
import { R_Scope_DateAndTime } from './scope/DateAndTimeScope';
import { R_Scope_ExportProject } from './scope/exportProjectScope';
import { R_Scope_VibrationOptions } from './scope/VibrationsOptionsScope';
import { R_Scope_VersionChange } from './scope/VersionChangeScope';
import { R_Scope_Sample } from './scope/SampleScope';
import { R_Scope_FileExplore } from './scope/FileExplore';
import { R_Scope_ExportedFiles } from './scope/ExportedFiles';
import { R_Scope_Theme } from './scope/ThemeScope';
import { R_Screen_WidgetThemePreview } from './Screen/WidgetThemePreview';
import { R_Screen_DateFormat } from './Screen/DateFormatScreen';
import { R_Screen_TimeFormat } from './Screen/TimeFormatScreen';
import { R_Screen_ExportProject } from './Screen/ExportProjectScreen';
import { R_Screen_VibrationOptions } from './Screen/VibrationOptionsScreen';
import { R_Screen_FileExplore } from './Screen/FileExplore'
import { R_Screen_ExportedFiles } from './Screen/ExportedFiles';
import { R_Alert_CreateProject } from './component/Alert/CreateProject';
import { R_Alert_CreateSample } from './component/Alert/CreateSample';
import { R_Alert_ExitApp } from './component/Alert/ExitApp';
import { R_Alert_Shared } from './component/Alert/__Shared__';
import { R_Alert_TemplateWidgetCopy } from './component/Alert/TemplateWidgetCopy';
import { R_Alert_UploadProject } from './component/Alert/UploadProject';
import { R_Alert_DownloadProjects } from './component/Alert/DownloadProject';
import { R_Button } from './component/Button';
import { R_Component_Camera } from './component/Camera';
import { R_Layout_PseudoWidget } from './component/Layout/PseudoWidget';
import { R_Widget_Root } from './Widget/Root';
import { R_Input_Boolean } from './widgetInput/BooleanInput';
import { R_Input_GPS } from './widgetInput/GPSInput';
import { R_Input_String } from './widgetInput/StringInput';
import { R_Input_Options } from './widgetInput/OptionsInput';
import { R_Input_Picture } from './widgetInput/PictureInput';
import { R_Input_Root } from './widgetInput/Root';
import { R_Input_Selection } from './widgetInput/SelectionInput';
import { R_Themes_App } from './Themes/AppThemes';
import { R_Themes_Widget } from './Themes/WidgetThemes';

export const translations = {
  global: {
    errors:                   R_ErrorCodes,
  },
  FileExportModules: {
    share:                    R_FileExportModules_Shared,
    csv:                      R_FileExportModules_CSV,
    docx:                     R_FileExportModules_DOCX,
  },
  scope: {
    home:                     R_Scope_Home,
    languageSelection:        R_Scope_Language,
    project:                  R_Scope_Project,
    sample:                   R_Scope_Sample,
    settings:                 R_Scope_Settings,
    versionChange:            R_Scope_VersionChange,
    credential:               R_Scope_Credential,
    theme:                    R_Scope_Theme,
    dateAndTime:              R_Scope_DateAndTime,
    exportProject:            R_Scope_ExportProject,
    vibrationOptions:         R_Scope_VibrationOptions,
    fileExplore:              R_Scope_FileExplore,
    exportedFiles:            R_Scope_ExportedFiles,
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
    vibrationOptions:         R_Screen_VibrationOptions,
    fileExplore:              R_Screen_FileExplore,
    exportedFiles:            R_Screen_ExportedFiles,
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
    camera:                   R_Component_Camera,
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
    selection:                R_Input_Selection,
    picture:                  R_Input_Picture,
    gps:                      R_Input_GPS,
    Root:                     R_Input_Root,
  },
  themes: {
    app:                      R_Themes_App,
    widget:                   R_Themes_Widget,
  },
};
