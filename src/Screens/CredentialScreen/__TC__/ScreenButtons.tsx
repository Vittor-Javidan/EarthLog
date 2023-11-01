import React, { memo, useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onCreateCredential: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="card-outline"
          showPlusSign
          buttonDiameter={60}
          onPress={props.onCreateCredential}
          theme={{
            font: theme.font,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.background_active,
          }}
        />
      </>}
    />
  );
});
