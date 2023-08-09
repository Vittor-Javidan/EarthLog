import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { rules } = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('HOME SCREEN')}
        />
      }
      button_right={rules.allowSampleCreation ? (
        <Layout.Button.IconRounded
          iconName="clipboard"
          showPlusSign={true}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await useNavigate('SAMPLE CREATION SCREEN', id_project)}
        />
      ) : undefined}
    />
  );
}
