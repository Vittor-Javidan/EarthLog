import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules } = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={() => navigate('HOME SCREEN')}
        />
      }
      button_right={rules.allowSampleCreation ? (
        <Layout.Button.IconRounded
          iconName="clipboard"
          showPlusSign={true}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={() => navigate('SAMPLE CREATION SCREEN', id_project)}
        />
      ) : undefined}
    />
  );
}
