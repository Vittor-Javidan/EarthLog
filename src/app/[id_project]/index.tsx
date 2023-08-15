import React, { useState, useMemo, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import ProjectService from '@Services/ProjectService';

import { Drawer } from './Drawer';
import NavigationTree from './NavigationTree';
import SampleButtons from './LocalComponents/SampleButtons';
import ScreenButtons from './ScreenButtons';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchSamples(id_project, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={projectSettings === null ? '...' : projectSettings.name}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <SampleButtons />
      )}
    </Layout.Root>
  );
}

async function fetchSamples(
  id_project: string,
  whenLoaded: () => void
) {
  await ProjectService.saveLastOpenProject(id_project);
  await ProjectService.loadAllSamplesSettings(id_project);
  whenLoaded();
}
