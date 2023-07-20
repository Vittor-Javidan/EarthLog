import React, { useMemo, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import Widgets_PointTemplate from './Widgets_PointTemplate';
import Widgets_Project from './Widgets_Project';

import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';
import { Translations_ProjectCreationScreen } from '@Translations/Screens/ProjectCreationScreen';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';

import API_ProjectCreation from './API_ProjectCreation';

export default function ProjectCreationScreen() {

  const navigation = useNavigation();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_ProjectCreationScreen[Languages]>(() => {
    return translations.Screens.ProjectCreationScreen[ConfigService.config.language];
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (API_ProjectCreation.unsavedChanges) {
        API_ProjectCreation.reset();
      }
    });
  }, []);

  function onConfirm() {

    if (API_ProjectCreation.temporaryProject.projectSettings.id_project === '') {
      alert('ID cannot be empty. This is your local database file name.');
      return;
    }

    if (false) {
      /* TODO:
        - Check if project ID already exists.
        - Database must be implemented already.
      */
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
        <Inputs_ProjectSettings />
        <Widgets_Project />
        <Widgets_PointTemplate />
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