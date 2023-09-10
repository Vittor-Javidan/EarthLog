import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/index';
import { useTimeout } from '@Hooks/index';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import { API } from '../__API__';

export default function SampleWidgets() {

  const [_, refresh] = useState<boolean>(false);
  API.SampleWidgets.setterRegister(refresh);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Sample.map(widgetData => {
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
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  const [state, setState] = useState<States_WidgetUnit>({
    widgetData: UtilService.deepCopy(props.widgetData),
    saved: true,
  });

  useAutoSave(() => {
    setState(prev => ({ ...prev, saved: true}));
  }, [state]);

  async function onConfirm(widgetData: WidgetData) {
    setState(({
      widgetData: { ...widgetData },
      saved: false,
    }));
  }

  async function onDelete(id_widget: string) {
    await ProjectService.deleteWidget_Sample(
      id_project,
      id_sample,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        props.onDelete();
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  return (
    <Widget.Selector
      widgetData={state.widgetData}
      gpsReference={sampleSettings.gps}
      onConfirm={async (widgetData) => await onConfirm(widgetData)}
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
  dependecyArray: [ States_WidgetUnit ],
) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const { widgetData, saved } = dependecyArray[0];

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateWidget_Sample(
        id_project,
        id_sample,
        widgetData,
        () => {
          CacheService.updateCache_SampleWidget(widgetData);
          onSucces();
        },
        (errorMessage) => {
          alert(errorMessage);
        }
      );
    }
  }, dependecyArray, 200);
}
