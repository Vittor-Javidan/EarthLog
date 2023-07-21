
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { ColorInput } from './ColorInput';
import { ExampleFigure } from './ExampleFigure';

import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';
import { Translations_ThemeScreen } from '@Translations/Screens/SettingsScreen/ThemeScreen';

import ConfigService from '@Services/ConfigService';
import LogService from '@Services/LogService';
import { Languages } from '@Services/LanguageService';

import API_ExampleFigure from './API_ExampleFigure';

export default function ThemeScreen(): JSX.Element {

  LogService.useLog('THEME SCREEN: rendered');

  const navController = useRouter();
  const navigation = useNavigation();
  const savedTheme = useMemo(() => ConfigService.config.theme, [ConfigService.config.theme]);
  const stringResources = useMemo<Translations_ThemeScreen[Languages]>(() => {
    return translations.Screens.ThemeScreen[ConfigService.config.language];
  }, []);

  const [locked, setLocked] = useState<boolean>(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (API_ExampleFigure.unsavedChanges) {
        API_ExampleFigure.discart();
      }
    });
  }, []);

  return (
    <Layout.Root
      title={stringResources['Theme']}
      iconName="color-palette"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => {
            API_ExampleFigure.discart();
            navController.push(AppRoutes.HOME);
          }}
        />,
        <Icon.Settings
          key="treeIcon_2"
          onPress={() => {
            API_ExampleFigure.discart();
            navController.push(AppRoutes.SETTINGS_SCREEN);
          }}
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
          onPress={() => {
            API_ExampleFigure.reset();
          }}
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
          onPress={() => {
            API_ExampleFigure.discart();
            navController.push(AppRoutes.SETTINGS_SCREEN);
          }}
        />
        <Layout.Button
          title={stringResources['Save']}
          overrideBackgroundColor={savedTheme.confirm}
          overrideTextColor={savedTheme.onConfirm}
          onPress={async () => {
            await API_ExampleFigure.save();
            navController.push(AppRoutes.SETTINGS_SCREEN);
          }}
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
