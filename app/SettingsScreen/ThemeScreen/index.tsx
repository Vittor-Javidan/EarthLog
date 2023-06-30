
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import Layout from '../../../Components/Layout';
import { ThemeScreenTranslations, languages } from './translations';
import { Languages } from '../../../Types/LanguageTypes';
import ConfigService from '../../../Services/ConfigService';
import Layout_Button from '../../../Components/Layout_Button';
import AppRoutes from '../../Routes';
import Layout_DrawerButton from '../../../Components/Layout_DrawerButton';
import { ColorInput } from './ColorInput';
import LogService from '../../../Services/LogService';
import Layout_ScrollView from '../../../Components/Layout_ScrollView';
import Layout_Content from '../../../Components/Layout_Content';
import ExampleFigure from './ExampleFigure';
import API_ExampleFigure from './API_ExampleFigure';

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
    <Layout
      title={stringResources['Theme']}
      drawerChildren={<>
        <Layout_DrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push(AppRoutes.MAIN_SCREEN)}
        />
      </>}
    >
      {locked && <ExampleFigure
        locked={locked}
        onPressLock={() => setLocked(prev => !prev)}
      />}
      <Layout_ScrollView
        style={{ flex: 1 }}
      >
        {!locked && <ExampleFigure
          locked={locked}
          onPressLock={() => setLocked(prev => !prev)}
        />}
        <AllInputs />
        <Layout_Content
          style={{
            marginTop: 10,
          }}
        >
          <Layout_Button
            title={stringResources['Reset Theme']}
            onPress={reset}
          />
          <Layout_Button
            title={stringResources['Discart and Return']}
            onPress={discartAndExit}
            overrideBackgroundColor={savedTheme.wrong}
            overrideTextColor={savedTheme.onWrong}
          />
          <Layout_Button
            title={stringResources['Save and Return']}
            onPress={saveAndExit}
            overrideBackgroundColor={savedTheme.confirm}
            overrideTextColor={savedTheme.onConfirm}
          />
        </Layout_Content>
      </Layout_ScrollView>
    </Layout>
  );
}

function AllInputs(): JSX.Element {
  return <>{Object.values(ColorInput).map((Component, index) => <Component key={index}/>)}</>;
}
