import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
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

  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  const [loading              , setLoading               ] = useState<Loading>('Loading');
  const [gpsReferenceRefresher, setGPSReferenceRefresher ] = useState<boolean>(false);
  const [updatedName          , setUpdatedName           ] = useState<string | null>(null);

  const sampleAlias = projectSettings.sampleAlias.singular === '' ? 'Sample' : projectSettings.sampleAlias.singular;

  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setLoading('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={sampleAlias}
      subtitle={updatedName ?? sampleSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel

        onBackPress={() => navigate('PROJECT SCOPE', id_project)}

        buttonData={[          {
          title: 'Data',
        }, {
          title: '',
          iconName: 'information-circle-sharp',
        }]}

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
