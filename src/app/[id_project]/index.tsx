import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { ProjectScreen } from '@Screens/ProjectScreen';
import { TemplateScreen } from '@Screens/TemplateScreen';
import { ProjectInfoScreen } from '@Screens/ProjectInfoScreen';
import { ProjectSettings } from '@Types/ProjectTypes';

export default function ProjectScope() {

  const id_project = useLocalSearchParams().id_project as string;

  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.scope.project[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const [loading                 , setLoading                  ] = useState<Loading>('Loading');
  const [updatedName             , setUpdatedName              ] = useState<string | null>(null);
  const [updatedSampleAliasPlural, setUpdatedSampleAliasPlural ] = useState<string | null>(null);

  const sampleAliasPlural = updatedSampleAliasPlural ?? projectSettings.sampleAlias.plural;

  useEffect(() => {
    fetchSamples(id_project, () => setLoading('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Project']}
      subtitle={updatedName ?? projectSettings.name}
      drawerChildren={<Drawer projectSettings={projectSettings}/>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel
        isLoading={loading === 'Loaded'}
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
            projectScopeState={loading}
          />,
          <TemplateScreen
            key="2"
            projectScopeState={loading}
          />,
          <ProjectInfoScreen
            key="3"
            projectScopeState={loading}
            onProjectNameUpdate={(newName) => setUpdatedName(newName)}
            onSampleAliasChange={(newSampleAlias) => setUpdatedSampleAliasPlural(newSampleAlias)}
          />,
        ]}
      />
    </Layout.Root>
  );
}

const NavigationTree = memo(() => {
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
          onPress={() => {}}
        />,
      ]}
    />
  );
});

const Drawer = memo((props: {
  projectSettings: ProjectSettings
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R               = useMemo(() => translations.scope.project[config.language], []);

  return (<>
    {props.projectSettings.rules.allowProjectExport && (
      <Button.TextWithIcon
        title={R['Export project']}
        iconName="arrow-redo"
        theme={{
          font: theme.font,
          background: theme.background,
          font_Pressed: theme.font_active,
          background_Pressed: theme.background_active,
        }}
        onPress={() => navigate('EXPORT PROJECT SCOPE', id_project)}
      />
    )}
  </>);
});

async function fetchSamples(
  id_project: string,
  whenLoaded: () => void
) {
  if (id_project !== CacheService.lastOpenProject.id_project) {
    const promises = [
      CacheService.saveLastOpenProject(id_project),
      CacheService.loadAllSamplesSettings(id_project),
      CacheService.loadAllWidgets_Project(id_project),
      CacheService.loadAllWidgets_Template(id_project),
    ];
    await Promise.all(promises);
  }
  whenLoaded();
}
