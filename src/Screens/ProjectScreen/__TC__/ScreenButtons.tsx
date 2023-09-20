import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { API } from '../__API__';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);

  async function createSample() {
    AlertService.handleAlert(true, {
      question: '',
      type: 'sample creation',
      id_project: id_project,
    }, () => {
      API.SampleButtons.refresh();
    });
  }

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
        <Button.RoundedIcon
          key="2"
          iconName="clipboard"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={async () => await createSample()}
          theme={{
            font: theme.onConfirm,
            font_Pressed: theme.onTertiary,
            background: theme.confirm,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}
    />
  );
}
