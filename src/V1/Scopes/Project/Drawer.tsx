import React, { useMemo, memo } from 'react';

import { ProjectSettings } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';

export const Drawer = memo((props: {
  projectSettings: ProjectSettings
  onExportProject: () => void
  onDownloadAllPictures: () => void
  onResetSyncData: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.project[config.language], []);

  return (<>
    {props.projectSettings.rules.allowProjectExport && (
      <Button.TextWithIcon
        title={R['Export project']}
        iconName="arrow-redo"
        theme={{
          font:              theme.font,
          font_active:       theme.font_active,
          background:        theme.background,
          background_active: theme.background_active,
        }}
        onPress={() => props.onExportProject()}
      />
    )}
    <Button.TextWithIcon
      title={R['Download all pictures']}
      iconName="cloud-download-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => props.onDownloadAllPictures()}
    />
    {props.projectSettings.rules.enableResetSyncData && (
      <Button.TextWithIcon
        title={R['Reset sync data']}
        iconName="cloud-refresh-variant"
        theme={{
          font:              theme.font_wrong,
          font_active:       theme.background_wrong,
          background:        theme.background_wrong,
          background_active: theme.font_wrong,
        }}
        onPress={() => props.onResetSyncData()}
      />
    )}
  </>);
});
