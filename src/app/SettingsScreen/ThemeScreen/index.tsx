
import React, { useState, useMemo, useEffect } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import AllInputs from './LocalComponents/ColorInput';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './LocalComponents/API_ExampleFigure';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Drawer from './Drawer';

export default function ThemeScreen(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, [ConfigService.config.theme]);
  const stringResources = useMemo(() => translations.Screens.ThemeScreen[language], []);

  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => { setState('Loaded'); }, []);
  useBackPress(async () => await cancelAndExit());

  async function cancelAndExit() {
    API_ExampleFigure.discart();
    await useNavigate('SETTINGS SCREEN');
  }

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
        <Layout.View>
          <AllInputs />
        </Layout.View>
      )}
    </Layout.Root>
  );
}
