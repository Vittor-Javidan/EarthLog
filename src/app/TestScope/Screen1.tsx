import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { Input } from '@Components/Input';
import { BooleanInputData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';

export function Screen1() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.Screen
      screenButtons={<></>}
      style={{
        backgroundColor: theme.background,
      }}
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

const MOCKED_DATA: BooleanInputData = {
  id_input: '',
  type: 'boolean',
  label: 'Test 1',
  value: true,
  notApplicable: false,
};

function TestInput() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Input.Boolean
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
        background: theme.background,
        confirm: theme.confirm,
        disabled: 'gray',
        wrong: theme.wrong,
      }}
    />
  );
}
