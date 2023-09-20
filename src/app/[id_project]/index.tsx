import React, { useState, useMemo, useEffect, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Loading } from '@Types/otherTypes';
import { useBackPress } from '@Hooks/index';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';

import { Layout } from '@Layout/index';
import { ProjectScreen as _ProjectScreen } from '@Screens/ProjectScreen';
import { TemplateScreen as _TemplateScreen } from '@Screens/TemplateScreen';
import { ProjectInfoScreen as _ProjectInfoScreen } from '@Screens/ProjectInfoScreen';

type MemoProps1 = { projectScopeState: Loading; };
type MemoProps2 = { projectScopeState: Loading; onProjectNameUpdate: (newName: string) => void;};

const ProjectScreen     = memo((props: MemoProps1) => <_ProjectScreen {...props} />    );
const TemplateScreen    = memo((props: MemoProps1) => <_TemplateScreen {...props} />   );
const ProjectInfoScreen = memo((props: MemoProps2) => <_ProjectInfoScreen {...props} />);

export default function ProjectScope() {

  const id_project = useLocalSearchParams().id_project as string;
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const [selectedScreen , setSelectedScreen ] = useState<number>(1);
  const [state          , setState          ] = useState<Loading>('Loading');
  const [updatedName    , setUpdatedName    ] = useState<string | null>(null);

  useBackPress(() => navigate('HOME SCOPE'));
  useEffect(() => {
    fetchSamples(id_project, () => setState('Loaded'));
  }, []);

  return (
    <Layout.Root
      title={updatedName ?? projectSettings.name}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            onSelect={(screeNumber) => setSelectedScreen(screeNumber)}
          />
        }
        screens={[
          <ProjectScreen      projectScopeState={state} key="1" />,
          <TemplateScreen     projectScopeState={state} key="2" />,
          <ProjectInfoScreen
            projectScopeState={state} key="3"
            onProjectNameUpdate={(newName) => setUpdatedName(newName)}
          />,
        ]}
      />
    </Layout.Root>
  );
}

function OverlayButtons(props: {
  selectedScreen: number
  onSelect: (screenNumber: number) => void
}) {
  return (
    <>
      <Layout.Carousel.Button
        selected={props.selectedScreen === 1}
        title="Samples"
        onPress={() => props.onSelect(1)}
        type="left"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 2}
        title="Template"
        onPress={() => props.onSelect(2)}
        type="middle"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 3}
        title="Info"
        onPress={() => props.onSelect(3)}
        type="right"
      />
    </>
  );
}

function NavigationTree() {
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
        />,
      ]}
    />
  );
}


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
