import React, { useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.ScreenButtons
    buttons={[
        <Button.RoundedIcon
          key="1"
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font: theme.onSecondary,
            font_Pressed: theme.onTertiary,
            background: theme.secondary,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}
    />
  );
}
