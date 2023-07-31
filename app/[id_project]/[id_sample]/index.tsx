import React, { useState, useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';

import AppRoutes from '@Globals/AppRoutes';
import { SampleSettings, WidgetData } from '@Types/index';

import LogService from '@Services/LogService';
import ProjectService from '@Services/ProjectService';
import AddWidgetButton from './AddWidgetButton';

export default function SampleScreens() {

  const { id_project, id_sample } = useLocalSearchParams();
  const navController = useRouter();
  const settings = useMemo<SampleSettings>(() => ProjectService.getSample(id_sample as string), []);

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
      </Layout.View>
    </Layout.Root>
  );
}

function SampleWidgets() {

  const { id_project, id_sample } = useLocalSearchParams();
  const [_, refresh] = useState<boolean>(false);

  async function onConfirm(widgetData: WidgetData) {
    await ProjectService.updateWidget_Sample(
      id_project as string,
      id_sample as string,
      widgetData,
      () => {},
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  async function onDelete(widgetData: WidgetData) {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget_Sample(
      id_project as string,
      id_sample as string,
      id_widget,
      () => {
        refresh(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project as string,
      id_sample as string,
      widgetData,
      () => {
        refresh(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  const allWidgetsComponents: JSX.Element[] = ProjectService.allWidgets_Sample.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={async (widgetData) => await onConfirm(widgetData)}
        onDelete={async () => await onDelete(widgetData)}
      />
    );
  });

  return (
    <>
      {allWidgetsComponents}
      <AddWidgetButton
        onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
      />
    </>
  );
}
