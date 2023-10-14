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
import SyncService from '@Services/SyncService';

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

    const newWidget = ProjectService.getWidgetData();
    const { id_widget } = newWidget;

    await ProjectService.createWidget_Sample(id_project,id_sample, newWidget,
      async () => {
        CacheService.addToAllWidgets_Sample(newWidget);
        await SyncService.syncData_SampleWidgets(id_project, id_sample, id_widget, 'creation');
        props.onCreateWidget();
      },
      (errorMessage) => alert(errorMessage)
    );

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
