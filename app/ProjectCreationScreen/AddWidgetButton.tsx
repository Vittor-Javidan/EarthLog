import React, { useState, useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ProjectService, { WidgetData, WidgetLabel, WidgetName } from '@Services/ProjectService';
import { ThemeDTO } from '@Services/ThemeService';

import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

export default function AddWidgetButton(props: {
  widgets: Record<WidgetLabel, WidgetData>
  onCreateWidget: (label: WidgetLabel, widgetData: WidgetData) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const [showModal, setShowlModal] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');

  function whenLabelValid(callback: () => void) {
    if (label === '') {
      alert('Label cannot be empty');
      return;
    }
    if (Object.keys(props.widgets).includes(label)) {
      alert('Label cannot be duplicated');
      return;
    }
    callback();
  }

  function onPress(widgetName: WidgetName) {
    whenLabelValid(() => props.onCreateWidget(label, ProjectService.getWidgetData(widgetName)));
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
            label="Label name"
            backgroundColor_Label={theme.tertiary}
            backgroundColor_Value={theme.background}
            color_Label={theme.onTertiary}
            color_Value={theme.onBackground}
            color_Placeholder={'#444'}
            placeholder={'give a name to the widget here...'}
            value={label}
            onChangeText={setLabel}
            onResetPress={() => setLabel('')}
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button
              title="Boolean Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => onPress('BooleanWidget')}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button
              title="Text Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => onPress('TextWidget')}
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
