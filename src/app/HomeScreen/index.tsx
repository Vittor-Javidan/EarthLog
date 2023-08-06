import React, { useMemo } from 'react';
import { BackHandler, Alert } from 'react-native';
import * as Vibration from 'expo-haptics';
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

  useBackPress(async () => {
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
    Alert.alert(
      stringResources['Hold on!'],
      stringResources['Want to exit?'],
      [
        {
          text: stringResources['NO'],
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
            return null;
          },
          style: 'cancel',
        },
        {
          text: stringResources['YES'],
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
            BackHandler.exitApp();
          },
        },
      ]
    );
  });

  return (
    <Layout.Root
      title="Earth Log"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
        />,
      ]}
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
