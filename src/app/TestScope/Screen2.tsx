import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { Input } from '@Components/Input';
import { StringInputData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';

export function Screen2() {
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

const MOCKED_DATA: StringInputData = {
  id_input: '',
  type: 'string',
  label: 'Test 2',
  value: '',
  placeholder: 'placeholder test',
};

function TestInput() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Input.String
      multiline
      inputData={MOCKED_DATA}
      editWidget={false}
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
      }}
    />
  );
}
