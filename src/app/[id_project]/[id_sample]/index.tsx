import React, { useState, useMemo, useEffect, memo, useTransition, useCallback } from 'react';
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
  const id_sample  = useLocalSearchParams().id_sample as string;
  const [_, startTransitions] = useTransition();

  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  const [loading              , setLoading               ] = useState<Loading>('Loading');
  const [selectedScreen       , setSelectedScreen        ] = useState<number>(1);
  const [gpsReferenceRefresher, setGPSReferenceRefresher ] = useState<boolean>(false);
  const [updatedName          , setUpdatedName           ] = useState<string | null>(null);

  const sampleAlias = projectSettings.sampleAlias.singular === '' ? 'Sample' : projectSettings.sampleAlias.singular;

  const onChangeScreen = useCallback((nextScreen: number) => {
    startTransitions(() => setSelectedScreen(nextScreen));
  }, []);

  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setLoading('Loaded'));
  }, []);

  useBackPress(() => {
    selectedScreen !== 1 ? onChangeScreen(1) : navigate('PROJECT SCOPE', id_project);
  }, [selectedScreen]);

  return (
    <Layout.Root
      title={sampleAlias}
      subtitle={updatedName ?? sampleSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            onSelect={(screeNumber) => onChangeScreen(screeNumber)}
          />
        }
        screens={[
          <SampleDataScreens
            key={'refresher:' + gpsReferenceRefresher}
            sampleScopeState={loading}
          />,
          <SampleSettingsScreen
            key="2"
            sampleScopeState={loading}
            onSampleNameUpdate={(newName) => setUpdatedName(newName)}
            onGPSReferenceUpdate={() => setGPSReferenceRefresher(prev => !prev)}
          />,
        ]}
      />
    </Layout.Root>
  );
}

const OverlayButtons = memo((props: {
  selectedScreen: number
  onSelect: (screenNumber: number) => void
}) => {
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
});

const NavigationTree = memo(() => {
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
          onPress={() => {}}
        />,
      ]}
    />
  );
});

async function fetchWidgets(
  id_project: string,
  id_sample: string,
  whenLoaded: () => void
) {
  await CacheService.loadAllWidgets_Sample(id_project, id_sample);
  await CacheService.loadAllWidgets_Template(id_project);
  whenLoaded();
}
