import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import CacheService from '@V1/Services/CacheService';
import AlertService from '@V1/Services/AlertService';

import { Layout } from '@V1/Layout/index';
import { ProjectScreen } from '@V1/Screens/ProjectScreen';
import { TemplateScreen } from '@V1/Screens/TemplateScreen';
import { ProjectInfoScreen } from '@V1/Screens/ProjectInfoScreen';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

export default function ProjectScope() {

  const id_project                                               = useLocalSearchParams().id_project as string;
  const config                                                   = useMemo(() => ConfigService.config, []);
  const R                                                        = useMemo(() => translations.scope.project[config.language], []);
  const projectSettings                                          = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const [state                   , setState                    ] = useState<Loading>('Loading');
  const [updatedName             , setUpdatedName              ] = useState<string | null>(null);
  const [updatedSampleAliasPlural, setUpdatedSampleAliasPlural ] = useState<string | null>(null);
  const [refresher               , refresh                     ] = useState<boolean>(true);

  const sampleAliasPlural = updatedSampleAliasPlural ?? projectSettings.sampleAlias.plural;

  const onDownloadAllPictures = useCallback(async () => {
    const allMissingPictures = CacheService.identifyMissingPictures({ id_project });
    await AlertService.handleAlert(true, {
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
            title: sampleAliasPlural !== '' ? sampleAliasPlural : R['Samples'],
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
            />,
            <TemplateScreen
              key="2"
            />,
            <ProjectInfoScreen
              key="3"
              onProjectNameUpdate={(newName) => setUpdatedName(newName)}
              onSampleAliasChange_Plural={(newSampleAlias) => setUpdatedSampleAliasPlural(newSampleAlias)}
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
