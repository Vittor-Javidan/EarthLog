import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Drawer } from './Drawer';
import Widgets_Sample from './Widgets_Sample';

import ProjectService from '@Services/ProjectService';
import ConfigService from '@Services/ConfigService';
import { WidgetData } from '@Types/index';
import { Widget } from '@Components/Widget';

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  const [_, refresh] = useState<boolean>(false);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      () => refresh(prev => !prev),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.Root
      title={sampleSettings.name}
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="map"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="clipboard"
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />
      }
      button_right={
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
        />
      }
    >
      <Widgets_Sample />
    </Layout.Root>
  );
}
