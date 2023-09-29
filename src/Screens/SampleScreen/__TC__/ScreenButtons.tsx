import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import AlertService from '@Services/AlertService';

export default function ScreenButtons(props: {
  onCreateWidget: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  async function onCreateWidget() {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      ProjectService.getWidgetData(),
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        props.onCreateWidget();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  async function onTemplateWidgetCopy() {
    await AlertService.handleAlert(true,
      {
        question: 'Select a widget to copy',
        type: 'template widget copy',
        id_project: id_project,
        id_sample: id_sample,
      },
      () => {
        props.onCreateWidget();
      }
    );
  }

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
            onPress={() => onCreateWidget()}
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
}
