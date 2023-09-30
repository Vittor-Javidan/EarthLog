import React, { useState, useMemo, useEffect, memo, useCallback, useTransition } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import { useBackPress } from '@Hooks/index';
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
  const [_, startTransitions] = useTransition();

  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.scope.projectScope[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const [loading           , setLoading            ] = useState<Loading>('Loading');
  const [selectedScreen    , setSelectedScreen     ] = useState<number>(1);
  const [updatedName       , setUpdatedName        ] = useState<string | null>(null);
  const [updatedSampleAlias, setUpdatedSampleAlias ] = useState<string | null>(null);

  const sampleAlias = projectSettings.sampleAlias.plural !== '' ? projectSettings.sampleAlias.plural : 'Samples';

  const onChangeScreen = useCallback((nextScreen: number) => {
    startTransitions(() => setSelectedScreen(nextScreen));
  }, []);

  useEffect(() => {
    fetchSamples(id_project, () => setLoading('Loaded'));
  }, []);

  useBackPress(() => {
    selectedScreen !== 1 ? onChangeScreen(1) : navigate('HOME SCOPE');
  }, [selectedScreen]);

  return (
    <Layout.Root
      title={R['Project']}
      subtitle={updatedName ?? projectSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            sampleAlias={updatedSampleAlias ?? sampleAlias}
            onSelect={(screeNumber) => onChangeScreen(screeNumber)}
          />
        }
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

const OverlayButtons = memo((props: {
  selectedScreen: number
  sampleAlias: string
  onSelect: (screenNumber: number) => void
}) => {
  return (
    <>
      <Layout.Carousel.Button
        title={props.sampleAlias}
        type="left"
        selected={props.selectedScreen === 1}
        onPress={() => props.onSelect(1)}
      />
      <Layout.Carousel.Button
        title="Template"
        type="middle"
        iconName="copy-sharp"
        selected={props.selectedScreen === 2}
        onPress={() => props.onSelect(2)}
      />
      <Layout.Carousel.Button
        title=""
        type="right"
        iconName="information-circle-sharp"
        selected={props.selectedScreen === 3}
        onPress={() => props.onSelect(3)}
      />
    </>
  );
});

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
