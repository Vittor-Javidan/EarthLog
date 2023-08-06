
import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
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
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await cancelAndExit('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="language"
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="close"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={async () => await cancelAndExit('SETTINGS SCREEN')}
        />
      }
      button_middle={
        <Layout.Button.IconRounded
          iconName="refresh-sharp"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => resetTheme()}
        />
      }
      button_right={
        <Layout.Button.IconRounded
          iconName="save"
          showPlusSign={false}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await confirmAndSave()}
        />
      }
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
