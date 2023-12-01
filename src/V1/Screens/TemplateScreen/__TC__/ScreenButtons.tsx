import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ConfigService from '@V1/Services/ConfigService';
import CacheService from '@V1/Services/CacheService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';

export const ScreenButtons = memo((props: {
  onCreateWidget: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        {projectSettings.rules.showCreateWidgetButton_Template && (
          <Button.RoundedIcon
            iconName="square"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCreateWidget}
            theme={{
              font:              theme.font,
              font_active:       theme.confirm,
              background:        theme.confirm,
              background_active: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
