import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { ProjectSettings } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';
import ThemeService from '@V2/Services/ThemeService';
import AlertService from '@V2/Services/AlertService';

import { Button } from '@V2/Button/index';
import { Layout } from '@V2/Layout/index';
import { ProjectScreen } from '@V2/Screens/ProjectScreen';
import { TemplateScreen } from '@V2/Screens/TemplateScreen';
import { ProjectInfoScreen } from '@V2/Screens/ProjectInfoScreen';

export default function ProjectScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.scope.project[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);
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

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="folder"
          onPress={() => {}}
        />,
      ]}
    />
  );
});

const Drawer = memo((props: {
  projectSettings: ProjectSettings
  onDownloadAllPictures: () => void
}) => {

  const id_project = props.projectSettings.id_project;
  const config     = useMemo(() => ConfigService.config, []);
  const theme      = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R          = useMemo(() => translations.scope.project[config.language], []);

  return (<>
    {props.projectSettings.rules.allowProjectExport && (
      <Button.TextWithIcon
        title={R['Export project']}
        iconName="arrow-redo"
        theme={{
          font:              theme.font,
          background:        theme.background,
          font_active:       theme.font_active,
          background_active: theme.background_active,
        }}
        onPress={() => navigate('EXPORT PROJECT SCOPE', id_project)}
      />
    )}
    <Button.TextWithIcon
      title={R['Download all pictures']}
      iconName="image"
      theme={{
        font:              theme.font,
        background:        theme.background,
        font_active:       theme.font_active,
        background_active: theme.background_active,
      }}
      onPress={() => props.onDownloadAllPictures()}
    />
  </>);
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
  whenLoaded();
}
