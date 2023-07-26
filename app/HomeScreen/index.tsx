import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';

import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';
import { Translations_HomeScreen } from '@Translations/Screens/HomeScreen';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ProjectService, { DataCredential } from '@Services/ProjectService';

export default function HomeScreen() {

  LogService.useLog('PROJECTS SCREEN: rendered');

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_HomeScreen[Languages]>(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

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
          onPress={() => navController.push(AppRoutes.PROJECT_CREATION_SCREEN)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {

  const navController = useRouter();
  const stringResources = useMemo<Translations_HomeScreen[Languages]>(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
    />
  );
}

function ProjectButtons() {

  const [projectCredentials, setProjectCredential] = useState<DataCredential[] | null>(null);
  const [lastOpenProjectCredential, setLastOpenProjectCredential] = useState<DataCredential | null>(null);
  const lastOpenExist = lastOpenProjectCredential !== null;

  useEffect(() => {
    async function scanProjectCredentials() {
      setProjectCredential(await ProjectService.getProjectsCredentials());
      setLastOpenProjectCredential(await ProjectService.getLastOpenProject());
    }
    scanProjectCredentials();
  }, []);

  const allProjectButtons = projectCredentials?.map(dataCredential => (
    <Layout.Button
      key={dataCredential.ID}
      title={dataCredential.name}
      onPress={async () => {
        await ProjectService.saveLastOpenProject(dataCredential);
      }}
    />
  ));

  return (<Layout.View>
    {lastOpenExist && (<>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color={'onBackground'}
      >
        Last Open
      </Layout.Text>
      <Layout.Button
        title={lastOpenProjectCredential.name}
        onPress={async () => {}}
      />
    </>)}
    <Layout.Text
      fontSize={ThemeService.FONTS.h2}
      color={'onBackground'}
    >
      Projects
    </Layout.Text>
    {allProjectButtons}
  </Layout.View>);
}
