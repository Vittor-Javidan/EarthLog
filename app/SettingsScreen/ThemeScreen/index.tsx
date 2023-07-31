
import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { ColorInput } from './ColorInput';
import { ExampleFigure } from './ExampleFigure';

import { Languages } from '@Types/index';
import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';
import { Translations_ThemeScreen } from '@Translations/Screens/SettingsScreen/ThemeScreen';

import ConfigService from '@Services/ConfigService';
import LogService from '@Services/LogService';

import API_ExampleFigure from './API_ExampleFigure';
import useBackPress from 'app/GlobalHooks';

export default function ThemeScreen(): JSX.Element {

  LogService.useLog('THEME SCREEN: rendered');

  const navController = useRouter();
  const savedTheme = useMemo(() => ConfigService.config.theme, [ConfigService.config.theme]);
  const stringResources = useMemo<Translations_ThemeScreen[Languages]>(() => {
    return translations.Screens.ThemeScreen[ConfigService.config.language];
  }, []);

  const [locked, setLocked] = useState<boolean>(false);

  useBackPress(() => exitScreen());

  function exitScreen() {
    API_ExampleFigure.discart();
    navController.push(AppRoutes.SETTINGS_SCREEN);
  }

  async function confirmTheme() {
    await API_ExampleFigure.save();
    navController.push(AppRoutes.SETTINGS_SCREEN);
  }

  function goToHomeScreen() {
    API_ExampleFigure.discart();
    navController.push(AppRoutes.HOME);
  }

  function resetTheme() {
    API_ExampleFigure.reset();
  }

  return (
    <Layout.Root
      title={stringResources['Theme']}
      iconName="color-palette"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => goToHomeScreen()}
        />,
        <Icon.Settings
          key="treeIcon_2"
          onPress={() => exitScreen()}
        />,
      ]}
    >
      {locked && <ExampleFigure
        locked={locked}
        onPressLock={() => setLocked(prev => !prev)}
      />}
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        {!locked && <ExampleFigure
          locked={locked}
          onPressLock={() => setLocked(prev => !prev)}
        />}
        <AllInputs />
        <Layout.Button
          title={stringResources['Reset Theme']}
          onPress={() => resetTheme()}
        />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Discart']}
          overrideBackgroundColor={savedTheme.wrong}
          overrideTextColor={savedTheme.onWrong}
          onPress={() => exitScreen()}
        />
        <Layout.Button
          title={stringResources['Save']}
          overrideBackgroundColor={savedTheme.confirm}
          overrideTextColor={savedTheme.onConfirm}
          onPress={async () => await confirmTheme()}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function AllInputs(): JSX.Element {
  return <>{Object.values(ColorInput).map((Component, index) => <Component key={index}/>)}</>;
}

function Drawer() {
  return <></>;
}
