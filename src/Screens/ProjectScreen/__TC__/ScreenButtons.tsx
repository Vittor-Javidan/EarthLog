import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import AlertService from '@Services/AlertService';
import { API } from '../__API__';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules } = useMemo(() => CacheService.getProjectFromCache(id_project), []);

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
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={() => navigate('HOME SCOPE')}
        />
      }
      button_right={rules.allowSampleCreation ? (
        <Layout.Button.IconRounded
          iconName="clipboard"
          showPlusSign={true}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await createSample()}
        />
      ) : undefined}
    />
  );
}
