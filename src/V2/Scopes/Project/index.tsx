import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { ProjectService } from '@V2/Services/ProjectService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_AllSamples } from './Screen_AllSamples';
import { Screen_TemplateWidgets } from './Screen_TemplateWidgets';
import { Screen_ProjectInfo } from './Screen_ProjectInfo';
import { NavigationTree } from './NavigationTree';
import { Drawer } from './Drawer';

type UpdatedAlias = {
  plural: null | string
  singular: null | string
}

export const ProjectScope = memo((props: {
  id_project: string
  onScopeChange: (scope: Scope) => void
}) => {

  const { id_project } = props
  const config                                      = useMemo(() => ConfigService.config, []);
  const R                                           = useMemo(() => translations.scope.project[config.language], []);
  const projectSettings                             = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
  const [state             , setState             ] = useState<Loading>('Loading');
  const [updatedName       , setUpdatedName       ] = useState<string | null>(null);
  const [refresher         , refresh              ] = useState<boolean>(true);
  const [updatedSampleAlias, setUpdatedSampleAlias] = useState<UpdatedAlias>({ plural: null, singular: null });

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
    FetchData(id_project, () => {
      setState('Loaded');
    });
  }, []);

  const sampleAlias_Plural   = updatedSampleAlias.plural ?? projectSettings?.sampleAlias.plural;
  const sampleAlias_Singular = updatedSampleAlias.singular ?? projectSettings?.sampleAlias.singular;

  return (
    <Layout.Root
      key={`${refresher}`}
      title={R['Project']}
      subtitle={updatedName ?? projectSettings.name}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
        />
      }
      drawerChildren={
        <Drawer
          projectSettings={projectSettings}
          onExportProject={() => props.onScopeChange({ scope: 'EXPORT PROJECT SCOPE', id_project })}
          onDownloadAllPictures={() => onDownloadAllPictures()}
          onResetSyncData={() => onResetSyncData()}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
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
            <Screen_AllSamples
              key="1"
              id_project={id_project}
              sampleAlias_Singular={sampleAlias_Singular !== '' ? sampleAlias_Singular : R['Sample']}
              projectRules={projectSettings.rules}
              onScreenButton_Home={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
              onScreenButton_Sample={(id_sample) => props.onScopeChange({ scope: 'SAMPLE SCOPE', id_project, id_sample })}
              onProjectDeletion_AfterUpload={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
            />,
            <Screen_TemplateWidgets
              key="2"
              id_project={id_project}
              projectRules={projectSettings.rules}
            />,
            <Screen_ProjectInfo
              key="3"
              id_project={id_project}
              projectSettings={projectSettings}
              onProjectNameUpdate={(newName) => setUpdatedName(newName)}
              onSampleAliasChange_Plural={(newSampleAlias) => setUpdatedSampleAlias(prev => ({ ...prev, plural: newSampleAlias }))}
              onSampleAliasChange_Singular={(newSampleAlias) => setUpdatedSampleAlias(prev => ({ ...prev, singular: newSampleAlias }))}
              onScreenButton_DeleteProject={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
            />,
          ]}
        />
      )}
    </Layout.Root>
  );
});

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
  MapAPI.changeScope({ type: 'project', id_project });
  whenLoaded();
}
