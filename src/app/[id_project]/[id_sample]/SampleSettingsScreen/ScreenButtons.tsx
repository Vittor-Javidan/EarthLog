import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);
  const { rules } = useMemo(() => sampleSettings, []);

  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  async function deleteSample() {
    await ProjectService.deleteSample(
      id_project,
      id_sample,
      async () => await useNavigate('PROJECT SCREEN', id_project),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons

      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, id_sample)}
        />
      }

      button_right={rules.allowSampleErase ? (
        <Layout.Button.IconRounded
          iconName="trash-outline"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={() => setShow_DeleteSwap(true)}
        />
      ) : undefined}

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Layout.Button.DeleteSwipe
          onSwipe={async () => await deleteSample()}
          onCancel={() => setShow_DeleteSwap(false)}
        />
      }
    />
  );
}
