import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { InputColors, WidgetData, WidgetTypes } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function AddWidgetButton(props: {
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Widgets.AddWidgetButton[language], []);

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
      background: theme.secondary,
      font: theme.onSecondary,
    },
    dataDisplay: {
      background: theme.tertiary,
      font: theme.onTertiary,
      font_placeholder: theme.onTertiary_Placeholder,
    },
  };

  return (<>
    <Layout.Button.IconRounded
      iconName="add-sharp"
      showPlusSign={false}
      color_background={theme.secondary}
      color={theme.onSecondary}
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
          <Layout.ScrollView>
            <Layout.Button.Text
              title={stringResources['Boolean']}
              color_background={theme.secondary}
              color_font={theme.onSecondary}
              onPress={() => onPress('boolean')}
            />
            <Layout.Button.Text
              title={stringResources['Text']}
              color_background={theme.secondary}
              color_font={theme.onSecondary}
              onPress={() => onPress('text')}
            />
          </Layout.ScrollView>
        </Layout.View>
      </Layout.Modal>
    )}
  </>);
}
