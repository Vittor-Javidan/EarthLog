
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { Layout } from '../../../Components/Layout';
import { ColorInput } from './ColorInput';
import { ExampleFigure } from './ExampleFigure';

import { Languages } from '../../../Types/LanguageTypes';
import ConfigService from '../../../Services/ConfigService';
import LogService from '../../../Services/LogService';
import API_ExampleFigure from './API_ExampleFigure';

import AppRoutes from '../../Routes';
import { ThemeScreenTranslations, languages } from './translations';

export default function ThemeScreen(): JSX.Element {

  LogService.useLog('THEME SCREEN: rendered');

  const navController = useRouter();
  const navigation = useNavigation();
  const savedTheme = useMemo(() => ConfigService.config.theme, [ConfigService.config.theme]);
  const stringResources = useMemo<ThemeScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
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
        <Layout.Icon.Home
          key="treeIcon_1"
          onPress={() => {
            API_ExampleFigure.discart();
            navController.push(AppRoutes.PROJECTS_SCREEN);
          }}
        />,
        <Layout.Icon.Settings
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
        <Layout.View
          style={{
            marginTop: 10,
          }}
        >
          <Layout.Button
            title={stringResources['Reset Theme']}
            onPress={() => {
              API_ExampleFigure.reset();
            }}
          />
          <Layout.Button
            title={stringResources['Discart and Exit']}
            overrideBackgroundColor={savedTheme.wrong}
            overrideTextColor={savedTheme.onWrong}
            onPress={() => {
              API_ExampleFigure.discart();
              navController.push(AppRoutes.SETTINGS_SCREEN);
            }}
          />
          <Layout.Button
            title={stringResources['Save and Return']}
            overrideBackgroundColor={savedTheme.confirm}
            overrideTextColor={savedTheme.onConfirm}
            onPress={() => async () => {
              API_ExampleFigure.save();
              navController.push(AppRoutes.SETTINGS_SCREEN);
            }}
          />
        </Layout.View>
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function AllInputs(): JSX.Element {
  return <>{Object.values(ColorInput).map((Component, index) => <Component key={index}/>)}</>;
}

function Drawer() {
  return <></>;
}
