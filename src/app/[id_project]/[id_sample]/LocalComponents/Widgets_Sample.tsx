import React, { useState, useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams } from 'expo-router';

import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';
import ProjectService from '@Services/ProjectService';

import API_Widgets_Sample from './API_Widgets_Sample';
import { Layout } from '@Components/Layout';

export default function Widgets_Sample() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Sample.setterRegister(refresh);

  async function onConfirm(widgetData: WidgetData) {
    await ProjectService.updateWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      () => {},
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  async function onDelete(widgetData: WidgetData) {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget_Sample(
      id_project,
      id_sample,
      id_widget,
      () => {
        refresh(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  const allWidgetsComponents: JSX.Element[] = ProjectService.allWidgets_Sample.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={async (widgetData) => await onConfirm(widgetData)}
        onDelete={async () => await onDelete(widgetData)}
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

