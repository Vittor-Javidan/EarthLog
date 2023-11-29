import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { GPS_DTO } from '@V1/Types/ProjectTypes';
import CacheService from '@V1/Services/CacheService';

import { Layout } from '@V1/Layout/index';
import { SampleDataScreens } from '@V1/Screens/SampleScreen';
import { SampleInfoScreen } from '@V1/Screens/SampleInfoScreen';

export default function SampleScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const sampleSettings  = useMemo(() => CacheService.getSampleFromCache({ id_sample }), []);

  const [state       , setState        ] = useState<Loading>('Loading');
  const [updatedName , setUpdatedName  ] = useState<string | null>(null);
  const [referenceGPS, setReferenceGPS ] = useState<GPS_DTO | undefined>(
    sampleSettings.gps !== undefined ? deepCopy(sampleSettings.gps) : undefined
  );

  const sampleAlias = projectSettings.sampleAlias.singular === '' ? 'Sample' : projectSettings.sampleAlias.singular;

  useEffect(() => {
    fetchWidgets(id_project, id_sample, () => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={sampleAlias}
      subtitle={updatedName ?? sampleSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
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
              referenceGPS={referenceGPS}
            />,
            <SampleInfoScreen
              key="2"
              onSampleNameUpdate={(newName) => setUpdatedName(newName)}
              onGPSReferenceUpdate={(gpsData) => setReferenceGPS(gpsData)}
            />,
          ]}
        />
      )}
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
    CacheService.loadAllWidgets_Sample({ id_project, id_sample }),
    CacheService.loadAllWidgets_Template({ id_project }),
  ];
  await Promise.all(promises);
  whenLoaded();
}
