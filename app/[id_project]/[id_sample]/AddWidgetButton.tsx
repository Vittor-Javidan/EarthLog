import React, { useState, useMemo, ReactNode } from 'react';
import { View } from 'react-native';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

import { ThemeDTO, WidgetData, WidgetTypes } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function AddWidgetButton(props: {
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const [showModal, setShowlModal] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');

  function whenLabelValid(callback: () => void) {
    if (label === '') {
      alert('Label cannot be empty');
      return;
    }
    callback();
  }

  function onPress(widgetName: WidgetTypes) {
    whenLabelValid(() => {
      const widgetData = ProjectService.getWidgetData(widgetName);
      widgetData.name = label;
      props.onCreateWidget(widgetData);
    });
    setLabel('');
    setShowlModal(false);
  }

  return (<>
    <Layout.Button
      title="Add"
      onPress={() => setShowlModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title="Add Widget"
        onRequestClose={() => setShowlModal(false)}
      >
        <Layout.View>
          <Input.String
            label="Widget name"
            backgroundColor_Label={theme.tertiary}
            backgroundColor_Value={theme.background}
            color_Label={theme.onTertiary}
            color_Value={theme.onBackground}
            color_Placeholder={theme.onBackground_Placeholder}
            placeholder="Write a name to the widget here..."
            value={label}
            onChangeText={setLabel}
            onResetPress={() => setLabel('')}
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button
              title="Boolean"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => onPress('boolean')}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button
              title="Text"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => onPress('text')}
            />
          </ButtonContainer>
        </Layout.ScrollView>
      </Layout.Modal>
    )}
  </>);
}

function ButtonContainer(props: { children: ReactNode }) {
  return <View style={{ height: 60 }}>{props.children}</View>;
}
