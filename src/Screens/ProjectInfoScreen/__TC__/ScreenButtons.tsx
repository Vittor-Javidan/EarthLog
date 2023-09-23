import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import ProjectService from '@Services/ProjectService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onWidgetCreation: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  async function createWidget_Project() {
    await ProjectService.createWidget_Project(
      id_project,
      ProjectService.getWidgetData(),
      async () => {
        await CacheService.loadAllWidgets_Project(id_project);
        props.onWidgetCreation();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  async function deleteProject() {
    const isLatOpenProject = CacheService.lastOpenProject.id_project === id_project;
    await ProjectService.deleteProject(
      id_project,
      async () => {
        if (isLatOpenProject) {
          await CacheService.deleteLastOpenProject();
        }
        navigate('HOME SCOPE');
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons
      buttons={[
        <Button.RoundedIcon
          key="1"
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />,
        <Button.RoundedIcon
          key="2"
          iconName="trash-outline"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => setShow_DeleteSwap(true)}
          theme={{
            font: theme.font,
            font_Pressed: theme.wrong,
            background: theme.wrong,
            background_Pressed: theme.background_active,
          }}
        />,
        <Button.RoundedIcon
          key="3"
          iconName="square"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={() => createWidget_Project()}
          theme={{
            font: theme.font,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.background_active,
          }}
        />,
      ]}

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Button.ConfirmSwipe
          onSwipe={async () => await deleteProject()}
          onCancel={() => setShow_DeleteSwap(false)}
          buttonRadius={30}
          theme={{
            font: theme.confirm,
            background: theme.background_active,
            confirm: theme.confirm,
            wrong: theme.wrong,
          }}
        />
      }
    />
  );
}
