import React, { useMemo, memo } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { ProjectSettings } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

const Drawer = memo((props: {
  projectSettings: ProjectSettings
  onDownloadAllPictures: () => void
}) => {

  const id_project = props.projectSettings.id_project;
  const config     = useMemo(() => ConfigService.config, []);
  const theme      = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R          = useMemo(() => translations.scope.project[config.language], []);

  return (<>
    {props.projectSettings.rules.allowProjectExport && (
      <Button.TextWithIcon
        title={R['Export project']}
        iconName="arrow-redo"
        theme={{
          font:              theme.font,
          background:        theme.background,
          font_active:       theme.font_active,
          background_active: theme.background_active,
        }}
        onPress={() => navigate('EXPORT PROJECT SCOPE', id_project)}
      />
    )}
    <Button.TextWithIcon
      title={R['Download all pictures']}
      iconName="image"
      theme={{
        font:              theme.font,
        background:        theme.background,
        font_active:       theme.font_active,
        background_active: theme.background_active,
      }}
      onPress={() => props.onDownloadAllPictures()}
    />
  </>);
});

export default Drawer;
