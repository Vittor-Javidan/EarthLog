import React, { useState, useMemo, useEffect, memo } from 'react';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { GPS_DTO } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V1/Layout/index';
import { Screen_SampleData } from './Screen_SampleData';
import { Screen_SampleInfo } from './Screen_SampleInfo';
import { NavigationTree } from './NavigationTree';

export const SampleScope = memo((props: {
  id_project: string;
  id_sample: string;
  onScopeChange: (scope: Scope) => void
}) => {

  const { id_project, id_sample } = props;
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
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onFolderPress={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
          buttonData={[{
            title: 'Data',
          }, {
            title: '',
            iconName: 'information-circle-sharp',
          }]}

          screens={[
            <Screen_SampleData
              key="1"
              id_project={id_project}
              id_sample={id_sample}
              referenceGPS={referenceGPS}
              onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
            />,
            <Screen_SampleInfo
              key="2"
              id_project={id_project}
              id_sample={id_sample}
              onSampleNameUpdate={(newName) => setUpdatedName(newName)}
              onGPSReferenceUpdate={(gpsData) => setReferenceGPS(gpsData)}
              onScreenButton_DeleteSample={(id_project) => props.onScopeChange({ scope: 'PROJECT SCOPE', id_project })}
            />,
          ]}
        />
      )}
    </Layout.Root>
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
  MapAPI.changeScope({ type: 'sample', id_project, id_sample });
  whenLoaded();
}
