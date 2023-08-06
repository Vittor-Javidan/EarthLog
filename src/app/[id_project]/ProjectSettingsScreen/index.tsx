import React, { useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import Widgets_Project from './Widgets_Project';
import DeleteButton from './DeleteButton';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import { WidgetData } from '@Types/index';
import ProjectService from '@Services/ProjectService';
import { Widget } from '@Components/Widget';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  const [_, refresh] = useState<boolean>(false);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  async function onCreate(widgetData: WidgetData) {
    await ProjectService.createWidget_Project(
      id_project,
      widgetData,
      () => refresh(prev => !prev),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.Root
      title={stringResources['Project Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<></>}
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
          onCreateWidget={async (widgetData) => await onCreate(widgetData)}
        />
      }
    >
      <Inputs_ProjectSettings />
      <Widgets_Project />
      <DeleteButton />
    </Layout.Root>
  );
}
