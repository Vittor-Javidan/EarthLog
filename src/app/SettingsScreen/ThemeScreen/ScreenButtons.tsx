import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import API_ExampleFigure from './LocalComponents/API_ExampleFigure';

export default function ScreenButtons() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  function resetTheme() {
    API_ExampleFigure.reset();
  }

  async function cancelAndExit() {
    API_ExampleFigure.discart();
    await useNavigate('SETTINGS SCREEN');
  }

  async function confirmAndSave() {
    await API_ExampleFigure.save();
    await useNavigate('SETTINGS SCREEN');
  }

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="close"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={async () => await cancelAndExit()}
        />
      }
      button_middle={
        <Layout.Button.IconRounded
          iconName="refresh-sharp"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => resetTheme()}
        />
      }
      button_right={
        <Layout.Button.IconRounded
          iconName="save"
          showPlusSign={false}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await confirmAndSave()}
        />
      }
    />
  );
}
