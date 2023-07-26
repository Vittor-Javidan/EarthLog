import React, { useMemo } from 'react';
import { Text} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import AppRoutes from '@Globals/AppRoutes';

import LogService from '@Services/LogService';
import { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import { Layout } from '@Components/Layout';
import { Icon } from '@Components/Icon';


export default function ProjectScreen() {

  LogService.useLog('PROJECT SCREEN: rendered');

  const navController = useRouter();
  const { id_project, name } = useLocalSearchParams();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Layout.Root
      title={name as string}
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
          {id_project}
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
          onPress={() => alert('ainda não implementado')}
        />
      </Layout.View>
    </Layout.Root>
  );
}
