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

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={sampleSettings.name}
      drawerChildren={<TC.Drawer />}
      navigationTree={<TC.NavigationTree />}
    >
      <Layout.Screen
        screenButtons={<TC.ScreenButtons />}
      >
        {state === 'Loading' ? (
          <Layout.Loading />
        ) : (
          <Layout.ScrollView>
            <Animation>
              <LC.SampleWidgets />
            </Animation>
          </Layout.ScrollView>
        )}
      </Layout.Screen>
    </Layout.Root>
  );
}

async function fetchWidgets(
  id_project: string,
  id_sample: string,
  whenLoaded: () => void
) {
  await CacheService.loadAllWidgets_Sample(id_project, id_sample);
  whenLoaded();
}

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: -height }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
