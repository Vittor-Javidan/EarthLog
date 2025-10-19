import React, { useState, useMemo, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { deepCopy } from '@V2/Globals/DeepCopy';
import { navigate } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { GPS_DTO } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';

import { Layout } from '@V2/Layout/index';
import { SampleDataScreens } from '@V2/Screens/SampleScreen';
import { SampleInfoScreen } from '@V2/Screens/SampleInfoScreen';

import NavigationTree from './NavigationTree';

export default function SampleScope() {

  const id_project                       = useLocalSearchParams().id_project as string;
  const id_sample                        = useLocalSearchParams().id_sample as string;
  const config                           = useMemo(() => ConfigService.config, []);
  const R                                = useMemo(() => translations.scope.sample[config.language], []);
  const projectSettings                  = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const sampleSettings                   = useMemo(() => CacheService.getSampleFromCache({ id_sample }), []);
  const [state       , setState        ] = useState<Loading>('Loading');
  const [updatedName , setUpdatedName  ] = useState<string | null>(null);
  const [referenceGPS, setReferenceGPS ] = useState<GPS_DTO | undefined>(sampleSettings.gps !== undefined ? deepCopy(sampleSettings.gps) : undefined);

  const sampleAlias = projectSettings.sampleAlias.singular === '' ? R['Sample'] : projectSettings.sampleAlias.singular;

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
