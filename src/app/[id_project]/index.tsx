import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import CacheService from '@Services/CacheService';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchSamples(id_project, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={projectSettings === null ? '...' : projectSettings.name}
      drawerChildren={<TC.Drawer />}
      navigationTree={<TC.NavigationTree />}
    >
      <Layout.Screen
        screenButtons={<TC.ScreenButtons />}
      >
        {state === 'Loading' ? (
          <Layout.Loading />
        ) : (
          <Animation>
            <LC.SampleButtons />
          </Animation>
        )}
      </Layout.Screen>
    </Layout.Root>
  );
}

async function fetchSamples(
  id_project: string,
  whenLoaded: () => void
) {
  if (id_project !== CacheService.lastOpenProject.id_project) {
    await CacheService.saveLastOpenProject(id_project);
    await CacheService.loadAllSamplesSettings(id_project);
  }
  whenLoaded();
}

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      from={{ left: -width }}
      transition={{
        type: 'timing',
        duration: 200,
        delay: 300,
      }}
      animate={{
        left: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
