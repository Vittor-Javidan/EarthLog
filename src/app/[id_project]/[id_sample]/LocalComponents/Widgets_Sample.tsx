import React, { useState, useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import API_Widgets_Sample from './API_Widgets_Sample';

export default function Widgets_Sample() {

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Sample.setterRegister(refresh);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Sample.map(widgetData => {
    return (
      <WidgetUnit
        key={widgetData.id_widget}
        widgetData={widgetData}
        onDelete={() => refresh(prev => !prev)}
      />
    );
  });

  return (
    <Layout.ScrollView>
      <Animation>
        {allWidgetsComponents}
      </Animation>
    </Layout.ScrollView>
  );
}

function WidgetUnit(props: {
  widgetData: WidgetData,
  onDelete: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const [saved, setSaved] = useState<boolean>(true);

  async function onConfirm(widgetData: WidgetData) {
    setSaved(false);
    await ProjectService.updateWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        setSaved(true);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
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
      widgetData={props.widgetData}
      onConfirm={async (widgetData) => await onConfirm(widgetData)}
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

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: -height }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}

