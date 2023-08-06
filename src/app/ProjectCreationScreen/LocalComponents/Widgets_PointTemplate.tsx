import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';

import { WidgetData } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import API_ProjectCreation from './API_ProjectCreation';

export default function Widgets_PointTemplate() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(widgetData: WidgetData) {
    API_ProjectCreation.updatePointTemplateWidget(widgetData);
  }

  function onDelete(widgetData: WidgetData) {
    API_ProjectCreation.deletePointTemplateWidget(widgetData);
    refresh(prev => !prev);
  }

  function onCreateWidget(widgetData: WidgetData) {
    API_ProjectCreation.addPointTemplateWidget(widgetData);
    refresh(prev => !prev);
  }

  const allWidgetsComponents: JSX.Element[] = API_ProjectCreation.temporaryProject.template.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={(widgetData) => { onConfirm(widgetData);}}
        onDelete={() => onDelete(widgetData)}
      />
    );
  });

  return (<>
    <Layout.Text
      fontSize={ThemeService.FONTS.h2}
      color="onBackground"
    >
      {stringResources['Point template']}
    </Layout.Text>
    {allWidgetsComponents}
    <Widget.AddWidgetButton
      onCreateWidget={(widgetData) => onCreateWidget(widgetData)}
    />
  </>);
}
