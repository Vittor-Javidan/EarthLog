import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';
import ProjectService from '@Services/ProjectService';

import API_Widgets_Template from './API_Widgets_Template';
import CacheService from '@Services/CacheService';
import { Layout } from '@Components/Layout';

export default function Widgets_Template() {

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Template.setterRegister(refresh);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Template.map(widgetData => {
    return (
      <WidgetUnit
        key={widgetData.id_widget}
        widgetData={widgetData}
        onDelete={() => refresh(prev => !prev)}
      />
    );
  });

  return (<>
    {allWidgetsComponents}
  </>);
}

function WidgetUnit(props: {
  widgetData: WidgetData,
  onDelete: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const [saved, setSaved] = useState<boolean>(true);

  async function onConfirm(widgetData: WidgetData) {
    setSaved(false);
    await ProjectService.updateWidget_Template(
      id_project,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        setSaved(true);
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  async function onDelete(id_widget: string) {
    await ProjectService.deleteWidget_Template(
      id_project,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        props.onDelete();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Widget.Selector
      key={props.widgetData.id_widget}
      widgetData={props.widgetData}
      onConfirm={async (widgetData) => { await onConfirm(widgetData);}}
      onDelete={async () => await onDelete(props.widgetData.id_widget)}
      statusFeedback={
        <Layout.StatusFeedback
          done={saved}
          error={false}
        />
      }
    />
  );
}
