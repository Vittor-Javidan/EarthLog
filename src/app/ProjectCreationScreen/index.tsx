import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import Drawer from './Drawer';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_ProjectSettings from './LocalComponents/Inputs_ProjectSettings';
import Widgets_Project from './LocalComponents/Widgets_Project';
import API_TemporaryProject from './LocalComponents/API_TemporaryProject';

export default function ProjectCreationScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  useBackPress(async () => {
    API_TemporaryProject.reset();
    navigate('HOME SCREEN');
  });

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.ScrollView>
        <Animation>
          <Inputs_ProjectSettings />
          <Widgets_Project />
        </Animation>
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: -height }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
