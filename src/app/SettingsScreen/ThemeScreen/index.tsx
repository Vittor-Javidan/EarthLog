
import React, { useState, useMemo, useEffect, ReactNode } from 'react';
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
import AllInputs from './LocalComponents/ColorInput';
import API_ExampleFigure from './LocalComponents/API_ExampleFigure';

export default function ThemeScreen(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, [ConfigService.config.theme]);
  const stringResources = useMemo(() => translations.Screens.ThemeScreen[language], []);

  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => { setState('Loaded'); }, []);
  useBackPress(async () => {
    API_ExampleFigure.discart();
    navigate('SETTINGS SCREEN');
  });

  return (
    <Layout.Root
      title={stringResources['Theme']}
      drawerChildren={<Drawer state={state} />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView>
          <Animation>
            <AllInputs />
          </Animation>
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      from={{ left: -width }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        left: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
