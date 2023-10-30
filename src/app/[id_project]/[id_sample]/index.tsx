import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { GPS_DTO } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Layout/index';
import { SampleDataScreens } from '@Screens/SampleScreen';
import { SampleInfoScreen } from '@Screens/SampleInfoScreen';
import ConfigService from '@Services/ConfigService';

export default function SampleScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config          = useMemo(() => ConfigService.config, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project, config), []);
  const sampleSettings  = useMemo(() => CacheService.getSampleFromCache(id_sample, config), []);

  const [loading     , setLoading      ] = useState<Loading>('Loading');
  const [updatedName , setUpdatedName  ] = useState<string | null>(null);
  const [referenceGPS, setReferenceGPS ] = useState<GPS_DTO | undefined>(
    sampleSettings.gps !== undefined ? UtilService.deepCopy(sampleSettings.gps) : undefined
  );

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
        isLoading={loading === 'Loaded'}
        onBackPress={() => navigate('PROJECT SCOPE', id_project)}
        buttonData={[{
          title: 'Data',
        }, {
          title: '',
          iconName: 'information-circle-sharp',
        }]}

        screens={[
          <SampleDataScreens
            key="1"
            sampleScopeState={loading}
            referenceGPS={referenceGPS}
          />,
          <SampleInfoScreen
            key="2"
            sampleScopeState={loading}
            onSampleNameUpdate={(newName) => setUpdatedName(newName)}
            onGPSReferenceUpdate={(gpsData) => setReferenceGPS(gpsData)}
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
  const promises = [
    CacheService.loadAllWidgets_Sample(id_project, id_sample),
    CacheService.loadAllWidgets_Template(id_project),
  ];
  await Promise.all(promises);
  whenLoaded();
}
