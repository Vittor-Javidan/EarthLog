import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Layout } from '@V1/Layout/index';
import { ProjectScreen } from '@V1/Screens/ProjectScreen';
import { TemplateScreen } from '@V1/Screens/TemplateScreen';
import { ProjectInfoScreen } from '@V1/Screens/ProjectInfoScreen';

import NavigationTree from './NavigationTree';
import Drawer from './Drawer';
import { ProjectService } from '@V1/Services/ProjectService';

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
    await PopUpAPI.handleAlert(true, {
      type: 'download pictures',
      id_project: id_project,
      picturesIDs: allMissingPictures,
    }, async () => {
      await CacheService.loadAllSyncData();
      refresh(prev => !prev);
    });
  }, []);

  const onResetSyncData = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'warning',
      question: R['Are you sure you want to reset all sync data? The process is irreversible. Only reset this in case you want to re-upload the entire project again to a new server.'],
    }, async () => {
      await ProjectService.resetSyncData({ id_project });
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
          onExportProject={() => navigate('EXPORT PROJECT SCOPE', id_project)}
          onDownloadAllPictures={() => onDownloadAllPictures()}
          onResetSyncData={() => onResetSyncData()}
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
