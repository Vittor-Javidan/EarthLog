import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';

export default function ScreenButtons() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <Layout.ScreenButtons
      button_right={
        <Layout.Button.IconRounded
          iconName="map"
          showPlusSign={true}
          color={theme.onConfirm}
          color_background={theme.confirm}
          onPress={async () => await useNavigate('PROJECT CREATION SCREEN')}
        />
      }
    />
  );
}
