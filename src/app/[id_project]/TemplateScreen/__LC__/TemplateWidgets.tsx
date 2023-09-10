import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/index';
import { useTimeout } from '@Hooks/index';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Widget } from '@Components/Widget';
import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function TemplateWidgets() {

  const [_, refresh] = useState<boolean>(false);
  API.TemplateWidgets.setterRegister(refresh);

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

type States_WidgetUnit = {
  widgetData: WidgetData,
  saved: boolean
}

function WidgetUnit(props: {
  widgetData: WidgetData,
  onDelete: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const [state, setState] = useState<States_WidgetUnit>({
    widgetData: UtilService.deepCopy(props.widgetData),
    saved: true,
  });

  useAutoSave(() => {
    setState(prev => ({ ...prev, saved: true}));
  }, [state]);

  async function onConfirm(widgetData: WidgetData) {
    setState(({
      widgetData: widgetData,
      saved: false,
    }));
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
          done={state.saved}
          error={false}
        />
      }
    />
  );
}

function useAutoSave(
  onSucces: () => void,
  dependecyArray: [States_WidgetUnit],
) {

  const id_project = useLocalSearchParams().id_project as string;
  const { widgetData, saved } = dependecyArray[0];

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateWidget_Template(
        id_project,
        widgetData,
        () => {
          CacheService.updateCache_TemplateWidget(widgetData);
          onSucces();
        },
        (errorMessage) => alert(errorMessage)
      );
    }
  }, dependecyArray, 200);
}
