import React from 'react';

import { Layout } from '@Layout/index';
import { NewWidgetData } from '@Types/ProjectTypes';
import Widget from '@Components/NewWidget';

export function Screen4() {
  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contenContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          gap: 10,
        }}
      >
        <TestWidget />
        <TestWidget />
        <TestWidget />
        <TestWidget />
        <TestWidget />
        <TestWidget />
      </Layout.ScrollView>
    </Layout.Screen>
  );
}

const MOCKED_DATA: NewWidgetData = {
  id_widget: '',
  widgetName: 'Test 2',
  inputs: [
    {
      id_input: '1',
      type: 'string',
      label: 'Test 2',
      value: '',
      placeholder: 'placeholder test',
    },
    {
      id_input: '2',
      type: 'boolean',
      label: 'Test 1',
      value: true,
      notApplicable: false,
    },
    {
      id_input: '3',
      type: 'gps',
      label: 'Test 2',
      value: {},
    },
  ],
  rules: {},
  autoGenerate: false,
};

function TestWidget() {
  return (
    <Widget
      widgetData={MOCKED_DATA}
      onDelete={() => {}}
      referenceGPSData={undefined}
      widgetScope={{
        type: 'template',
        id_project: '',
      }}
    />
  );
}
