
import React, { useState, useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import ThemeScreen, { ThemePreviewScreen } from '@Screens/ThemeScreen';

export default function ThemeScope(): JSX.Element {

  const { language } = useMemo(() => ConfigService.config, [ConfigService.config.theme]);
  const R = useMemo(() => translations.Screens.ThemeScreen[language], []);
  const [selectedScreen, setSelectedScreen] = useState<number>(1);

  useBackPress(async () => {
    navigate('SETTINGS SCREEN');
  });

  return (
    <Layout.Root
      title={R['Theme']}
      drawerChildren={<></>}
      navigationTree={ <NavigationTree /> }
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            onSelect={(screeNumber) => setSelectedScreen(screeNumber)}
          />
        }
        screens={[
          <ThemeScreen key="1" />,
          <ThemePreviewScreen key="2" />,
        ]}
      />
    </Layout.Root>
  );
}

function OverlayButtons(props: {
  selectedScreen: number
  onSelect: (screenNumber: number) => void
}) {
  return (
    <>
      <Layout.Carousel.Button
        selected={props.selectedScreen === 1}
        title="Colors"
        onPress={() => props.onSelect(1)}
        type="left"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 2}
        title="Preview"
        onPress={() => props.onSelect(2)}
        type="right"
      />
    </>
  );
}

function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCREEN')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings"
          onPress={() => navigate('SETTINGS SCREEN')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="color-palette"
        />,
      ]}
    />
  );
}
