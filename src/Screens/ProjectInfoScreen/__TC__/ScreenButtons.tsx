import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import ProjectService from '@Services/ProjectService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onWidgetCreation: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  const createWidget_Project = useCallback(async () => {

    // Project status update ===========================================
    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status === 'uploaded') {
      projectSettings.status = 'modified';
      await ProjectService.updateProject(
        projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Widget creation ==============================
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget_Project(
      id_project,
      newWidget,
      () => {
        CacheService.addToAllWidgets_Project(newWidget);
        props.onWidgetCreation();
      },
      (errorMessage) => alert(errorMessage)
    );

  }, [props.onWidgetCreation, id_project]);

  const deleteProject = useCallback(async () => {
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
  }, [id_project]);

  return (
    <Layout.ScreenButtons
      buttons={
        <>
          <Button.RoundedIcon
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
          />
          {projectSettings.rules.showCreateWidgetButton_Project && (
            <Button.RoundedIcon
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
            />
          )}
        </>
      }

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
});
