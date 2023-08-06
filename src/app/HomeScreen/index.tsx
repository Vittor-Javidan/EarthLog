import React, { useMemo } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import Drawer from './Drawer';
import ProjectButtons from './ProjectButtons';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function HomeScreen() {

  const { config } = useMemo(() => ConfigService, []);
  const { language, theme } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  useBackPress(() => {
    Alert.alert(
      stringResources['Hold on!'],
      stringResources['Want to exit?'],
      [
        {
          text: stringResources['NO'],
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: stringResources['YES'],
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
  });

  return (
    <Layout.Root
      title="Earth Log"
      iconName="md-menu-sharp"
      showNavigationTree={false}
      drawerChildren={<Drawer />}
      button_right={
        <Layout.Button.IconRounded
          iconName="map"
          showPlusSign={true}
          color={theme.onConfirm}
          color_background={theme.confirm}
          onPress={async () => await useNavigate('PROJECT CREATION SCREEN')}
        />
      }
    >
      <ProjectButtons />
    </Layout.Root>
  );
}
