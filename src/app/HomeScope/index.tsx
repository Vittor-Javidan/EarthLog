import React, { useState, useMemo, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import ApticsService from '@Services/ApticsService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import HomeScreen from '@Screens/HomeScreen';

export default function HomeScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.Screens.HomeScreen[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(async () => {
    await exitMessage();
    ApticsService.vibrate('warning');
  });

  useEffect(() => {
    fetchProject(() => setState('Loaded'));
  }, []);

  async function exitMessage() {
    await AlertService.handleAlert(true, {
      question: R['Want to exit?'],
      type: 'exit app',
    }, () => BackHandler.exitApp());
  }

  return (
    <Layout.Root
      title={R['Home screen']}
      drawerChildren={ <Drawer /> }
      navigationTree={ <NavigationTree /> }
    >
      <HomeScreen
        homeScopeState={state}
      />
    </Layout.Root>
  );
}

function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
        />,
      ]}
    />
  );
}

function Drawer() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.Screens.HomeScreen[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Settings']}
      iconName="settings"
      iconSide="Right"
      theme={{
        font: theme.font,
        background: theme.background,
        font_Pressed: theme.font_active,
        background_Pressed: theme.background_active,
      }}
      onPress={() => navigate('SETTINGS SCOPE')}
    />
  </>);
}

async function fetchProject(whenLoaded: () => void) {
  await CacheService.loadAllProjectsSettings();
  await CacheService.loadLastOpenProject();
  whenLoaded();
}
