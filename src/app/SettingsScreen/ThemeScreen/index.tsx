
import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { ColorInput } from './ColorInput';
import { ExampleFigure } from './ExampleFigure';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './API_ExampleFigure';

export default function ThemeScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { language, theme } = useMemo(() => config, [config.theme]);
  const stringResources = useMemo(() => translations.Screens.ThemeScreen[language], []);

  const [locked, setLocked] = useState<boolean>(false);

  useBackPress(async () => await cancelAndExit('SETTINGS SCREEN'));

  async function cancelAndExit(
    screen: 'HOME SCREEN' | 'SETTINGS SCREEN'
  ) {
    API_ExampleFigure.discart();
    await useNavigate(screen);
  }

  async function confirmAndSave() {
    await API_ExampleFigure.save();
    await useNavigate('SETTINGS SCREEN');
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
          onPress={async () => await cancelAndExit('HOME SCREEN')}
        />,
        <Icon.Settings
          key="treeIcon_2"
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
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
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
        />
        <Layout.Button
          title={stringResources['Save']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => await confirmAndSave()}
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
