import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={async () =>  await useNavigate('HOME SCREEN')}
        />
      }
    />
  );
}
