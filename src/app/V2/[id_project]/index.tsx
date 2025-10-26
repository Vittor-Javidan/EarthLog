import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';
import { AlertAPI } from '@V2/Layers/API/Alert';

import { Layout } from '@V2/Layout/index';
import { ProjectScreen } from '@V2/Screens/ProjectScreen';
import { TemplateScreen } from '@V2/Screens/TemplateScreen';
import { ProjectInfoScreen } from '@V2/Screens/ProjectInfoScreen';

import NavigationTree from './NavigationTree';
import Drawer from './Drawer';

type UpdatedAlias = {
  plural: null | string
  singular: null | string
}

export default function ProjectScope() {

  const id_project                                  = useLocalSearchParams().id_project as string;
  const config                                      = useMemo(() => ConfigService.config, []);
  const R                                           = useMemo(() => translations.scope.project[config.language], []);
  const projectSettings                             = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const [state             , setState             ] = useState<Loading>('Loading');
  const [updatedName       , setUpdatedName       ] = useState<string | null>(null);
  const [refresher         , refresh              ] = useState<boolean>(true);
  const [updatedSampleAlias, setUpdatedSampleAlias] = useState<UpdatedAlias>({ plural: null, singular: null });

  const sampleAlias_Plural   = updatedSampleAlias.plural ?? projectSettings.sampleAlias.plural;
  const sampleAlias_Singular = updatedSampleAlias.singular ?? projectSettings.sampleAlias.singular;

  const onDownloadAllPictures = useCallback(async () => {
    const allMissingPictures = CacheService.identifyMissingPictures({ id_project });
    await AlertAPI.handleAlert(true, {
      type: 'download pictures',
      id_project: id_project,
      picturesIDs: allMissingPictures,
    }, async () => {
      await CacheService.loadAllSyncData();
      refresh(prev => !prev);
    });
  }, []);

  useEffect(() => {
    FetchData(id_project, () => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      key={`${refresher}`}
      title={R['Project']}
      subtitle={updatedName ?? projectSettings.name}
      navigationTree={<NavigationTree />}
      drawerChildren={
        <Drawer
          projectSettings={projectSettings}
          onDownloadAllPictures={() => onDownloadAllPictures()}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={() => navigate('HOME SCOPE')}
          buttonData={[{
            title: sampleAlias_Plural !== '' ? sampleAlias_Plural : R['Samples'],
          },{
            title: 'Template',
            iconName: 'copy-sharp',
          },{
            title: '',
            iconName: 'information-circle-sharp',
          }]}

          screens={[
            <ProjectScreen
              key="1"
              sampleAlias_Singular={sampleAlias_Singular !== '' ? sampleAlias_Singular : R['Sample']}
            />,
            <TemplateScreen
              key="2"
            />,
            <ProjectInfoScreen
              key="3"
              onProjectNameUpdate={(newName) => setUpdatedName(newName)}
              onSampleAliasChange_Plural={(newSampleAlias) => setUpdatedSampleAlias(prev => ({ ...prev, plural: newSampleAlias }))}
              onSampleAliasChange_Singular={(newSampleAlias) => setUpdatedSampleAlias(prev => ({ ...prev, singular: newSampleAlias }))}
            />,
          ]}
        />
      )}
    </Layout.Root>
  );
}

async function FetchData(
  id_project: string,
  whenLoaded: () => void
) {
  if (id_project !== CacheService.lastOpenProject?.id_project) {
    const promises = [
      CacheService.saveLastOpenProject({ id_project }),
      CacheService.loadAllSamplesSettings({ id_project }),
      CacheService.loadAllWidgets_Project({ id_project }),
      CacheService.loadAllWidgets_Template({ id_project }),
    ];
    await Promise.all(promises);
  }
  whenLoaded();
}
