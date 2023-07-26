import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';

import AppRoutes from '@Globals/AppRoutes';

import LogService from '@Services/LogService';
import { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import { Layout } from '@Components/Layout';
import { Icon } from '@Components/Icon';
import ProjectService, { ProjectSetting } from '@Services/ProjectService';


export default function ProjectScreen() {

  LogService.useLog('PROJECT SCREEN: rendered');

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const settings = useMemo<ProjectSetting>(() => ProjectService.lastLoadedProject, []);

  return (
    <Layout.Root
      title={settings.name}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.HOME)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Text
          style={{ color: theme.onBackground }}
        >
          {settings.id_project}
        </Text>
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="New Sample"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => {
            navController.push(AppRoutes.PS_SAMPLE_CREATION_SCREEN(settings.id_project));
          }}
        />
      </Layout.View>
    </Layout.Root>
  );
}
