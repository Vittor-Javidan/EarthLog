import React, { useState, useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ProjectService, { WidgetData, WidgetLabel } from '@Services/ProjectService';
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

  function addBooleandWidget() {
    whenLabelValid(() => props.onCreateWidget(label, ProjectService.getWidgetData('BooleanWidget')));
  }

  function addTextWidget() {
    whenLabelValid(() => props.onCreateWidget(label, ProjectService.getWidgetData('TextWidget')));
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function ButtonContainer(props: { children: ReactNode }) {
    return <View style={{ height: 60 }}>{props.children}</View>;
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
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button
              title="Boolean Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => {
                addBooleandWidget();
                setLabel('');
                setShowlModal(false);
              }}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button
              title="Text Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => {
                addTextWidget();
                setLabel('');
                setShowlModal(false);
              }}
            />
          </ButtonContainer>
        </Layout.ScrollView>
      </Layout.Modal>
    )}
  </>);
}
