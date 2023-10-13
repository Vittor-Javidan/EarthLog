import React, { memo, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onCreateWidget: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);



  const onTemplateWidgetCopy = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'template widget copy',
      id_project: id_project,
      id_sample: id_sample,
    }, () => props.onCreateWidget());
  }, [props.onCreateWidget, id_project, id_sample]);



  const onCreateWidget_Sample = useCallback(async () => {

    // Project status update ============================================
    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status === 'uploaded') {
      projectSettings.status = 'modified';
      await ProjectService.updateProject(projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Sample status update ===================
    if (sampleSettings.status === 'uploaded') {
      sampleSettings.status = 'modified';
      await ProjectService.updateSample(id_project, sampleSettings,
        () => CacheService.updateCache_SampleSettings(sampleSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Widget creation ==============================
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget_Sample(id_project,id_sample, newWidget,
      () => CacheService.addToAllWidgets_Sample(newWidget),
      (errorMessage) => alert(errorMessage)
    );

    props.onCreateWidget();

  }, [props.onCreateWidget, id_project, id_sample]);



  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('PROJECT SCOPE', id_project)}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        {sampleSettings.rules.showCopyWidgetFromTemplateButton && (
          <Button.RoundedIcon
            iconName="copy"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={() => onTemplateWidgetCopy()}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
        {sampleSettings.rules.showCreateWidgetButton && (
          <Button.RoundedIcon
            iconName="square"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={() => onCreateWidget_Sample()}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
