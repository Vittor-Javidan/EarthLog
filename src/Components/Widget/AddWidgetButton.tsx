import React, { useState, useMemo, ReactNode } from 'react';
import { View } from 'react-native';
import { Layout } from '@Components/Layout';

import { InputColors, Languages, ThemeDTO, WidgetData, WidgetTypes } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_AddWidgetButton } from '@Translations/Widgets/AddWidgetButton';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function AddWidgetButton(props: {
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_AddWidgetButton[Languages]>(() => {
    return translations.Widgets.AddWidgetButton[ConfigService.config.language];
  }, []);

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

  const inputColors: InputColors = {
    label: {
      background: theme.tertiary,
      font: theme.onTertiary,
    },
    dataDisplay: {
      background: theme.background,
      font: theme.onBackground,
      font_placeholder: theme.onBackground_Placeholder,
    },
  };

  return (<>
    <Layout.Button.Text
      title={stringResources['Add']}
      onPress={() => setShowlModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title={stringResources['Add Widget']}
        onRequestClose={() => setShowlModal(false)}
      >
        <Layout.View>
          <Layout.Input.String
            colors={inputColors}
            label={stringResources['Widget name']}
            placeholder={stringResources['Write a name to the widget here...']}
            value={label}
            onChangeText={setLabel}
            locked={false}
            onResetPress={() => setLabel('')}
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button.Text
              title={stringResources['Boolean']}
              color_background={theme.tertiary}
              color_font={theme.onTertiary}
              onPress={() => onPress('boolean')}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button.Text
              title={stringResources['Text']}
              color_background={theme.tertiary}
              color_font={theme.onTertiary}
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
