
import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import { ColorInput } from './LocalComponents/ColorInput';
import { ExampleFigure } from './LocalComponents/ExampleFigure';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './LocalComponents/API_ExampleFigure';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function ThemeScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, [config.theme]);
  const stringResources = useMemo(() => translations.Screens.ThemeScreen[language], []);

  const [locked, setLocked] = useState<boolean>(false);

  useBackPress(async () => await cancelAndExit());

  async function cancelAndExit() {
    API_ExampleFigure.discart();
    await useNavigate('SETTINGS SCREEN');
  }

  return (
    <Layout.Root
      title={stringResources['Theme']}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      {!locked && (
        <ExampleFigure
          locked={locked}
          onPressLock={() => setLocked(prev => !prev)}
        />
      )}
      <AllInputs />
    </Layout.Root>
  );
}

function AllInputs(): JSX.Element {
  return <>{Object.values(ColorInput).map((Component, index) => <Component key={index}/>)}</>;
}

function Drawer() {
  return <></>;
}
