import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import WidgetsGroup from './WidgetsGroup';

import { translations } from '@Translations/index';
import { Translations_ProjectCreationScreen } from '@Translations/Screens/ProjectCreationScreen';

import { Languages } from '@Services/LanguageService';
import ConfigService from '@Services/ConfigService';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import API_ProjectCreation from './API_ProjectCreation';

export default function Widgets_PointTemplate() {

  const stringResources = useMemo<Translations_ProjectCreationScreen[Languages]>(() => {
    return translations.Screens.ProjectCreationScreen[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deletePointTemplateWidget(oldlabel);
    }
    API_ProjectCreation.modifyPointTemplateWidget(newLabel, value);
  }

  function onDelete(label: WidgetLabel) {
    API_ProjectCreation.deletePointTemplateWidget(label);
    refresh(prev => !prev);
  }

  function onCreateWidget(widgetData: WidgetData) {
    API_ProjectCreation.modifyPointTemplateWidget(widgetData.name, widgetData);
    refresh(prev => !prev);
  }

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Point template']}
      </Layout.Text>
      <WidgetsGroup
        widgets={API_ProjectCreation.temporaryProject.sampleTemplate}
        onConfirm={onConfirm}
        onDelete={onDelete}
        onCreateWidget={(widgetData) => onCreateWidget(widgetData)}
      />
    </Layout.View>
  );
}
