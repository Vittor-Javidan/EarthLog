import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { API } from './__API__';
import { LC } from './__LC__';
import { TC } from './__TC__';

export default function ProjectCreationScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  useBackPress(async () => {
    API.TemporaryProject.reset();
    navigate('HOME SCREEN');
  });

  return (
    <Layout.Root
      title={R['Project creation']}
      drawerChildren={<></>}
      navigationTree={<TC.NavigationTree />}
    >
      <Layout.Screen
        screenButtons={<TC.ScreenButtons />}
      >
        <Layout.ScrollView>
          <Animation>
            <LC.ProjectSettingsWidget />
            <LC.ProjectWidgets />
          </Animation>
        </Layout.ScrollView>
      </Layout.Screen>
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
