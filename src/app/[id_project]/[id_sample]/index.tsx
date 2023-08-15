import React, { useState, useMemo, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import ProjectService from '@Services/ProjectService';

import { Drawer } from './Drawer';
import NavigationTree from './NavigationTree';
import Widgets_Sample from './LocalComponents/Widgets_Sample';
import ScreenButtons from './ScreenButtons';

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={sampleSettings.name}
      drawerChildren={<Drawer />}
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
          <Widgets_Sample />
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

async function fetchWidgets(
  id_project: string,
  id_sample: string,
  whenLoaded: () => void
) {
  await ProjectService.loadAllWidgets_Sample(id_project, id_sample);
  whenLoaded();
}
