import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import WidgetsGroup from './WidgetsGroup';

import { Languages } from '@Services/LanguageService';
import ConfigService from '@Services/ConfigService';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import API_ProjectCreation from './API_ProjectCreation';
import { Translations_ProjectCreationScreen } from '@Translations/Screens/ProjectCreationScreen';
import { translations } from '@Translations/index';

export default function Widgets_Project() {

  const stringResources = useMemo<Translations_ProjectCreationScreen[Languages]>(() => {
    return translations.Screens.ProjectCreationScreen[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deleteProjectWidget(oldlabel);
    }
    API_ProjectCreation.modifyProjectWidget(newLabel, value);
  }

  function onDelete(label: WidgetLabel) {
    API_ProjectCreation.deleteProjectWidget(label);
    refresh(prev => !prev);
  }

  function onCreateWidget(label: string, widgetData: WidgetData) {
    API_ProjectCreation.modifyProjectWidget(label, widgetData);
    refresh(prev => !prev);
  }

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Project widgets']}
      </Layout.Text>
      <WidgetsGroup
        widgets={API_ProjectCreation.temporaryProject.projectWidgets}
        onConfirm={onConfirm}
        onDelete={onDelete}
        onCreateWidget={(label, widgetData) => onCreateWidget(label, widgetData)}
      />
    </Layout.View>
  );
}
