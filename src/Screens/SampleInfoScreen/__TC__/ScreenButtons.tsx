import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Layout } from '@Layout/index';
import { Button } from '@Button/index';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme } = useMemo(() => ConfigService.config, []);

  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  async function deleteSample() {
    await ProjectService.deleteSample(
      id_project,
      id_sample,
      async () => {
        await CacheService.loadAllSamplesSettings(id_project);
        navigate('PROJECT SCOPE', id_project);
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons

      buttons={[
        <Button.RoundedIcon
          key="1"
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('PROJECT SCOPE', id_project)}
          theme={{
            font: theme.onSecondary,
            font_Pressed: theme.onTertiary,
            background: theme.secondary,
            background_Pressed: theme.tertiary,
          }}
        />,
        <Button.RoundedIcon
          key="2"
          iconName="trash-outline"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => setShow_DeleteSwap(true)}
          theme={{
            font: theme.onWrong,
            font_Pressed: theme.onTertiary,
            background: theme.wrong,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Button.ConfirmSwipe
          onSwipe={async () => await deleteSample()}
          onCancel={() => setShow_DeleteSwap(false)}
        />
      }
    />
  );
}
