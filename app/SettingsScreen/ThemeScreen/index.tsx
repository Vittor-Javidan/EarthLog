
import React, { useState, useMemo } from 'react';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { ColorInput } from './ColorInput';
import { ExampleFigure } from './ExampleFigure';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { Languages } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_ThemeScreen } from '@Translations/Screens/SettingsScreen/ThemeScreen';

import ConfigService from '@Services/ConfigService';

import API_ExampleFigure from './API_ExampleFigure';

export default function ThemeScreen(): JSX.Element {

  const savedTheme = useMemo(
    () => ConfigService.config.theme, [ConfigService.config.theme]
  );
  const stringResources = useMemo<Translations_ThemeScreen[Languages]>(
    () => translations.Screens.ThemeScreen[ConfigService.config.language], []
  );

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
          overrideBackgroundColor={savedTheme.wrong}
          overrideTextColor={savedTheme.onWrong}
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
        />
        <Layout.Button
          title={stringResources['Save']}
          overrideBackgroundColor={savedTheme.confirm}
          overrideTextColor={savedTheme.onConfirm}
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
