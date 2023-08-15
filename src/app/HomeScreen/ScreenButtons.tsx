import React, { useMemo } from 'react';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.ScreenButtons
      button_right={
        <Layout.Button.IconRounded
          iconName="folder"
          showPlusSign={true}
          color={theme.onConfirm}
          color_background={theme.confirm}
          onPress={() => navigate('PROJECT CREATION SCREEN')}
        />
      }
    />
  );
}
