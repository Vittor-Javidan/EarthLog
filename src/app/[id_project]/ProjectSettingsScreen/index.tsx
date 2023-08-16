import React, { useState, useMemo, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Widgets_Project from './LocalComponents/Widgets_Project';
import Inputs_ProjectSettings from './LocalComponents/Inputs_ProjectSettings';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchWidgets(id_project, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Edit project']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contenContainerStyle={{
            paddingTop: 10,
            padding: 5,
            gap: 10,
          }}
        >
          <Inputs_ProjectSettings />
          <Widgets_Project />
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

async function fetchWidgets(
  id_project: string,
  whenLoaded: () => void
) {
  await ProjectService.loadAllWidgets_Project(id_project);
  whenLoaded();
}

