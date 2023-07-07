
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
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
  const savedTheme = useMemo(() => ConfigService.config.theme, [ConfigService.config.theme]);
  const stringResources = useMemo<ThemeScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [locked, setLocked] = useState<boolean>(false);

  const saveAndExit = useCallback(async () => {
    API_ExampleFigure.save();
    navController.push(AppRoutes.SETTINGS_SCREEN);
  }, []);

  const reset = useCallback(() => {
    API_ExampleFigure.reset();
  }, []);

  const discartAndExit = useCallback(() => {
    API_ExampleFigure.discart();
    navController.push(AppRoutes.SETTINGS_SCREEN);
  }, []);

  return (
    <Layout.Root
      title={stringResources['Theme']}
      navbarButtonType="GoBack"
      showNavigationTree={true}
      navigationTreeIcons={[
        <Layout.Icon.Home
          onPress={() => navController.push(AppRoutes.MAIN_SCREEN)}
        />,
        <Layout.Icon.Settings
          onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
        />,
      ]}
      onGoBackPress={() => discartAndExit()}
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
            onPress={reset}
          />
          <Layout.Button
            title={stringResources['Save and Return']}
            onPress={saveAndExit}
            overrideBackgroundColor={savedTheme.confirm}
            overrideTextColor={savedTheme.onConfirm}
          />
        </Layout.View>
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function AllInputs(): JSX.Element {
  return <>{Object.values(ColorInput).map((Component, index) => <Component key={index}/>)}</>;
}
