import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';

import { Layout } from '@Components/Layout';
import { ProjectCreationScreenTranslations, languages } from './translations';

export default function ProjectCreationScreen() {

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  return (
    <Layout.Root
      title={stringResources['Project Creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
        />,
      ]}
    >
      <Layout.ScrollView>
        {}
      </Layout.ScrollView>
      <Layout.View>
        <Layout.Button
          title={stringResources['Cancel']}
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
        />
        <Layout.Button
          title={stringResources['Confirm']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => {}}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}

