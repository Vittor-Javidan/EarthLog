import React, { useState, useMemo } from 'react';

import { Languages } from '@Services/LanguageService';
import ConfigService from '@Services/ConfigService';
import { WidgetData } from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import { Layout } from '@Components/Layout';
import WidgetsGroup from './WidgetsGroup';

import API_ProjectCreation from './API_ProjectCreation';
import { ProjectCreationScreenTranslations, languages } from './translations';

export default function Widgets_PointTemplate() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deletePointTemplateWidget(oldlabel);
    }
    API_ProjectCreation.modifyPointTemplateWidget(newLabel, value);
  }

  function onCreateWidget(label: string, widgetData: WidgetData) {
    API_ProjectCreation.modifyPointTemplateWidget(label, widgetData);
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
        refreshSetterKey="PointWidgetTemplate"
        widgets={API_ProjectCreation.temporaryProject.pointTemplate}
        onConfirm={onConfirm}
        onCreateWidget={(label, widgetData) => onCreateWidget(label, widgetData)}
      />
    </Layout.View>
  );
}
