import React, { useMemo } from 'react';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './LocalComponents/API_ExampleFigure';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  function resetTheme() {
    API_ExampleFigure.reset();
  }

  function cancelAndExit() {
    API_ExampleFigure.discart();
    navigate('SETTINGS SCREEN');
  }

  async function confirmAndSave() {
    await API_ExampleFigure.save();
    navigate('SETTINGS SCREEN');
  }

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="close"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={() => cancelAndExit()}
        />
      }
      button_middle={
        <Layout.Button.IconRounded
          iconName="refresh-sharp"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={() => resetTheme()}
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
