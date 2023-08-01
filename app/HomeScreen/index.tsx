import React, { useMemo } from 'react';
import { BackHandler, Alert } from 'react-native';
import { Layout } from '@Layout/index';
import ProjectButtons from './ProjectButtons';
import Drawer from './Drawer';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function HomeScreen() {

  const theme = useMemo(() => ConfigService.config.theme, []);
  const stringResources = useMemo(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

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
    >
      <Layout.ScrollView>
        <ProjectButtons />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['New Project']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => useNavigate('PROJECT CREATION SCREEN')}
        />
      </Layout.View>
    </Layout.Root>
  );
}
