
import React, { useState, useMemo, useEffect } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import { ExampleFigure } from './LocalComponents/ExampleFigure';
import AllInputs from './LocalComponents/ColorInput';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './LocalComponents/API_ExampleFigure';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function ThemeScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, [config.theme]);
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
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (<>
        <ExampleFigure/>
        <AllInputs />
      </>)}
    </Layout.Root>
  );
}
