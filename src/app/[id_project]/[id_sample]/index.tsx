import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { useBackPress } from '@Hooks/index';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';

import { Layout } from '@Layout/index';
import { SampleDataScreens as _SampleDataScreens } from '@Screens/SampleScreen';
import { SampleInfoScreen as _SampleSettingsScreen } from '@Screens/SampleInfoScreen';

type MemoProps1 = { sampleScopeState: Loading; }
type MemoProps2 = {
  sampleScopeState: Loading,
  onSampleNameUpdate: (newName: string) => void,
}

const SampleDataScreens     = memo((props: MemoProps1) => <_SampleDataScreens {...props} />   );
const SampleSettingsScreen  = memo((props: MemoProps2) => <_SampleSettingsScreen {...props} />);

export default function SampleScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  const [selectedScreen , setSelectedScreen ] = useState<number>(1);
  const [state          , setState          ] = useState<Loading>('Loading');
  const [updatedName    , setUpdatedName    ] = useState<string | null>(null);

  useBackPress(() => navigate('PROJECT SCOPE', id_project));
  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={updatedName ?? sampleSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            onSelect={(screeNumber) => setSelectedScreen(screeNumber)}
          />
        }
        screens={[
          <SampleDataScreens    sampleScopeState={state} key="1" />,
          <SampleSettingsScreen
            sampleScopeState={state} key="2"
            onSampleNameUpdate={(newName) => setUpdatedName(newName)}
          />,
        ]}
      />
    </Layout.Root>
  );
}

function OverlayButtons(props: {
  selectedScreen: number
  onSelect: (screenNumber: number) => void
}) {
  return (
    <>
      <Layout.Carousel.Button
        selected={props.selectedScreen === 1}
        title="Data"
        onPress={() => props.onSelect(1)}
        type="left"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 2}
        title="Info"
        onPress={() => props.onSelect(2)}
        type="right"
      />
    </>
  );
}

function NavigationTree() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
          onPress={() => navigate('PROJECT SCOPE', id_project)}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="clipboard"
        />,
      ]}
    />
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
