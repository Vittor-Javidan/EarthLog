import React, { useMemo } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';

import AppRoutes from '@Globals/AppRoutes';
import { ProjectSettings, ThemeDTO } from '@Types/index';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';


export default function ProjectScreen() {

  const { id_project } = useLocalSearchParams();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const settings = useMemo<ProjectSettings>(() => ProjectService.getProject(id_project as string), []);

  LogService.useLog(`RENDERED: Project Screen
    id: ${id_project}
  `);

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
        <SampleButtons />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Back"
          onPress={() => {
            navController.push(AppRoutes.HOME);
          }}
        />
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

function SampleButtons() {

  const projectSettings = useMemo<ProjectSettings>(() => ProjectService.lastProject, []);
  const navController = useRouter();

  const showLastProjectButton = ProjectService.allSamples.length > 0;
  const allSampleButtons = ProjectService.allSamples.map(sampleSettings => (
    <Layout.Button
      key={sampleSettings.id_sample}
      title={sampleSettings.name}
      onPress={async () => {
        await ProjectService.loadAllSampleWidgetData(projectSettings.id_project, sampleSettings.id_sample);
        navController.push(AppRoutes.PS_SAMPLE_SCREEN(projectSettings.id_project, sampleSettings.id_sample));
      }}
    />
  ));

  return (
    <Layout.View>
      {showLastProjectButton && (<>
          <Layout.Text
            fontSize={ThemeService.FONTS.h2}
            color={'onBackground'}
          >
            Samples
          </Layout.Text>
          {allSampleButtons}
        </>)}
    </Layout.View>
  );
}