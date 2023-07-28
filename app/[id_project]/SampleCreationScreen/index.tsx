import React, { useState, useMemo , useEffect } from 'react';
import { useRouter, useNavigation, Redirect } from 'expo-router';
import { Layout } from '@Components/Layout';

import AppRoutes from '@Globals/AppRoutes';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import ProjectService, { ProjectSetting } from '@Services/ProjectService';

import API_SampleCreation from './API_SampleCreation';
import Inputs_SampleSettings from './Inputs_SampleSettings';

export default function SampleCreationScreen() {

  LogService.useLog('SAMPLE CREATION SCREEN: rendered');

  const navigation = useNavigation();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const settings = useMemo<ProjectSetting>(() => ProjectService.lastLoadedProject, []);

  const [succed, setSucced] = useState<boolean>(false);

  useEffect(() => {
    // Resets API when component unmounts
    navigation.addListener('beforeRemove', () => {
      if (API_SampleCreation.unsavedChanges) {
        API_SampleCreation.reset();
      }
    });
  }, []);

  async function onConfirm() {

    if (API_SampleCreation.temporarySettings.id_sample === '') {
      alert('ID cannot be empty. This is your sample folder name.');
      return;
    }

    if (API_SampleCreation.temporarySettings.name === '') {
      alert('Sample Name Empty.');
      return;
    }

    await ProjectService.createSample(
      settings.id_project,
      API_SampleCreation.temporarySettings,
      () => {
        API_SampleCreation.reset();
        setSucced(true);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  if (succed) {
    return <Redirect href={AppRoutes.PROJECT_SCREEN(settings.id_project)} />;
  }

  return (
    <Layout.Root
      title="Sample Creation"
      iconName="pencil-sharp"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[]}
    >
      <Layout.ScrollView>
        <Inputs_SampleSettings />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Cancel"
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => {
            API_SampleCreation.reset();
            navController.push(AppRoutes.PROJECT_SCREEN(settings.id_project));
          }}
        />
        <Layout.Button
          title="Create"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => {
            await onConfirm();
          }}
        />
      </Layout.View>
    </Layout.Root>
  );
}
