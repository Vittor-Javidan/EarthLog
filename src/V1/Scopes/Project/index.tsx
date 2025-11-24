import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';

import {
  Loading
} from '@V1/Types';

import { Scope } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';
import { ProjectService } from '@V1/Services/ProjectService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V1/Layout/index';
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
  const [showDrawer        , setShowDrawer        ] = useState<boolean>(false);
  const [updatedName       , setUpdatedName       ] = useState<string | null>(null);
  const [refresher         , refresh              ] = useState<boolean>(true);
  const [updatedSampleAlias, setUpdatedSampleAlias] = useState<UpdatedAlias>({ plural: null, singular: null });

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

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

  const onBackPress = useCallback(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'HOME SCOPE' });
    }
  }, [MapAPI.isMapOpen, showDrawer]);

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
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
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
      menuIcon="folder"
      menuIconStyle={{
        paddingBottom: 5,
        paddingRight: 17,
        paddingLeft: 3,
      }}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          isDrawerOpen={showDrawer}
          onBackPress={onBackPress}
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
