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
  onGPSReferenceUpdate: () => void
}

const SampleDataScreens     = memo((props: MemoProps1) => <_SampleDataScreens {...props} />   );
const SampleSettingsScreen  = memo((props: MemoProps2) => <_SampleSettingsScreen {...props} />);

export default function SampleScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  const [selectedScreen     , setSelectedScreen     ] = useState<number>(1);
  const [updatedName        , setUpdatedName        ] = useState<string | null>(null);
  const [dataScreenRefresher, setDataScreenRefresher] = useState<boolean>(false);
  const [loading            , setLoading            ] = useState<Loading>('Loading');

  useBackPress(() => navigate('PROJECT SCOPE', id_project));
  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setLoading('Loaded'));
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
          <SampleDataScreens
            key={'refresher:' + dataScreenRefresher}
            sampleScopeState={loading}
          />,
          <SampleSettingsScreen
            key="2"
            sampleScopeState={loading}
            onSampleNameUpdate={(newName) => setUpdatedName(newName)}
            onGPSReferenceUpdate={() => setDataScreenRefresher(prev => !prev)}
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
        title="Data"
        type="left"
        selected={props.selectedScreen === 1}
        onPress={() => props.onSelect(1)}
      />
      <Layout.Carousel.Button
        title=""
        type="right"
        iconName="information-circle-sharp"
        selected={props.selectedScreen === 2}
        onPress={() => props.onSelect(2)}
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
