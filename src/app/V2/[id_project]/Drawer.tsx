import React, { useMemo, memo } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { ProjectSettings } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

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
