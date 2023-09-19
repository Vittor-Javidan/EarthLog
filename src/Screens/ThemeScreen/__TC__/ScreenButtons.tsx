import React, { useMemo } from 'react';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  function resetTheme() {
    API.ExampleFigure.reset();
  }

  function cancelAndExit() {
    API.ExampleFigure.discart();
    navigate('SETTINGS SCOPE');
  }

  async function confirmAndSave() {
    await API.ExampleFigure.save();
    navigate('SETTINGS SCOPE');
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
