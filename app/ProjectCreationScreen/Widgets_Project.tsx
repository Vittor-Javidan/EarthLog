import React, { useState, useMemo } from 'react';

import { Languages } from '@Services/LanguageService';
import ConfigService from '@Services/ConfigService';
import { WidgetData } from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import { Layout } from '@Components/Layout';
import WidgetsGroup from './WidgetsGroup';

import API_ProjectCreation from './API_ProjectCreation';
import { ProjectCreationScreenTranslations, languages } from './translations';

export default function Widgets_Project() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deleteProjectWidget(oldlabel);
    }
    API_ProjectCreation.modifyProjectWidget(newLabel, value);
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
        refreshSetterKey="ProjectWidgets"
        widgets={API_ProjectCreation.temporaryProject.projectWidgets}
        onConfirm={onConfirm}
        onCreateWidget={(label, widgetData) => onCreateWidget(label, widgetData)}
      />
    </Layout.View>
  );
}
