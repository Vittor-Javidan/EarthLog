import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';

import AppRoutes from '@Globals/AppRoutes';

import LogService from '@Services/LogService';
import { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import ProjectService, { SampleSettings, WidgetData } from '@Services/ProjectService';

export default function SampleScreens() {

  const { id_project, id_sample } = useLocalSearchParams();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const settings = useMemo<SampleSettings>(() => ProjectService.getCachedSampleSettings(id_sample as string), []);

  LogService.useLog(`RENDERED: Sample Screen
    id project: ${id_project}
    id sample: ${id_sample}
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
        <SampleWidgets />
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
            navController.push(AppRoutes.PROJECT_SCREEN( id_project as string ));
          }}
        />
        <Layout.Button
          title="New Widget"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => {}}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function SampleWidgets() {

  const widgetData = useMemo<WidgetData[]>(() => ProjectService.allWidgetsData, []);
  const allWidgetsComponents: JSX.Element[] = widgetData.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={(_) => {}}
        onDelete={() => {}}
      />
    );
  });

  return (
    <>
      {allWidgetsComponents}
    </>
  );
}
