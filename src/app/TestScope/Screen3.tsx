import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { Input } from '@Components/Input';
import { GPSInputData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';

export function Screen3() {
  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contenContainerStyle={{
          paddingTop: 55,
        }}
      >
        <TestInput />
        <TestInput />
        <TestInput />
        <TestInput />
        <TestInput />
      </Layout.ScrollView>
    </Layout.Screen>
  );
}

const MOCKED_DATA: GPSInputData = {
  id_input: '',
  type: 'gps',
  label: 'Test 2',
  value: {},
};

function TestInput() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Input.GPS
      inputData={MOCKED_DATA}
      editWidget={false}
      referenceGPSData={{
        coordinates: {
          lat: 0,
          long: 0,
          accuracy: 1,
        },
      }}
      onSave={() => {}}
      isFirstInput={false}
      isLastInput={false}
      onInputDelete={() => {}}
      onInputMoveUp={() => {}}
      onInputMoveDow={() => {}}
      theme={{
        font: theme.onBackground,
        font_placeholder: theme.onBackground_Placeholder,
        background: theme.background,
        confirm: theme.confirm,
        wrong: theme.wrong,
        modified: theme.modified,
      }}
    />
  );
}
