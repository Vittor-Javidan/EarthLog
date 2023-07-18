import React, { useMemo, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@Globals/AppRoutes';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

import { ProjectCreationScreenTranslations, languages } from './translations';
import API_ProjectCreation from './API_ProjectCreation';
import PointWidgetTemplate from './PointWidgetTemplate';
import ProjectWidgets from './ProjectWidgets';
import ProjectSettingsInputs from './ProjectSettingsInputs';

export default function ProjectCreationScreen() {

  const navigation = useNavigation();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (API_ProjectCreation.unsavedChanges) {
        API_ProjectCreation.reset();
      }
    });
  }, []);

  function onConfirm() {
    if (API_ProjectCreation.temporaryProject.projectSettings.ID === '') {
      alert('ID cannot be empty. This is your local database file name.');
      return;
    }
    API_ProjectCreation.reset();
    navController.push(AppRoutes.HOME);
  }

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.HOME)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <ProjectSettingsInputs />
        <ProjectWidgets />
        <PointWidgetTemplate />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Cancel']}
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => {
            API_ProjectCreation.reset();
            navController.push(AppRoutes.HOME);
          }}
        />
        <Layout.Button
          title={stringResources['Confirm']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => onConfirm()}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}

