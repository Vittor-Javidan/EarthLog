import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { ProjectScreen as _ProjectScreen } from '@Screens/ProjectScreen';
import { TemplateScreen as _TemplateScreen } from '@Screens/TemplateScreen';
import { ProjectInfoScreen as _ProjectInfoScreen } from '@Screens/ProjectInfoScreen';

const ProjectScreen = memo((props: {
  projectScopeState: Loading
}) => <_ProjectScreen {...props} />    );

const TemplateScreen    = memo((props: {
  projectScopeState: Loading
}) => <_TemplateScreen {...props} />   );

const ProjectInfoScreen = memo((props: {
  projectScopeState: Loading
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange: (newSampleAlias: string) => void
}) => <_ProjectInfoScreen {...props} />);

export default function ProjectScope() {

  const id_project = useLocalSearchParams().id_project as string;

  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.scope.projectScope[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const [loading           , setLoading            ] = useState<Loading>('Loading');
  const [updatedName       , setUpdatedName        ] = useState<string | null>(null);
  const [updatedSampleAlias, setUpdatedSampleAlias ] = useState<string | null>(null);

  const sampleAlias = projectSettings.sampleAlias.plural !== '' ? projectSettings.sampleAlias.plural : 'Samples';

  useEffect(() => {
    fetchSamples(id_project, () => setLoading('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={R['Project']}
      subtitle={updatedName ?? projectSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel

        onBackPress={() => navigate('HOME SCOPE')}

        buttonData={[{
          title: updatedSampleAlias ?? sampleAlias,
        }, {
          title: 'Template',
          iconName: 'copy-sharp',
        }, {
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
            onSampleAliasChange={(newSampleAlias) => setUpdatedSampleAlias(newSampleAlias)}
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

async function fetchSamples(
  id_project: string,
  whenLoaded: () => void
) {
  if (id_project !== CacheService.lastOpenProject.id_project) {
    await CacheService.saveLastOpenProject(id_project);
    await CacheService.loadAllSamplesSettings(id_project);
    await CacheService.loadAllWidgets_Project(id_project);
    await CacheService.loadAllWidgets_Template(id_project);
  }
  whenLoaded();
}
