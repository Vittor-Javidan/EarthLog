import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onWidgetCreation: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);
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
            font: theme.onSecondary,
            font_Pressed: theme.onTertiary,
            background: theme.secondary,
            background_Pressed: theme.tertiary,
          }}
        />,
        <Button.RoundedIcon
          key="2"
          iconName="trash-outline"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => setShow_DeleteSwap(true)}
          theme={{
            font: theme.onWrong,
            font_Pressed: theme.onTertiary,
            background: theme.wrong,
            background_Pressed: theme.tertiary,
          }}
        />,
        <Button.RoundedIcon
          key="3"
          iconName="list"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={() => createWidget_Project()}
          theme={{
            font: theme.onConfirm,
            font_Pressed: theme.onTertiary,
            background: theme.confirm,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Button.ConfirmSwipe
          onSwipe={async () => await deleteProject()}
          onCancel={() => setShow_DeleteSwap(false)}
        />
      }
    />
  );
}
