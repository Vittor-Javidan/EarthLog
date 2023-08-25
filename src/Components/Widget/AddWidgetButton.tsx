import React, { useState, useMemo } from 'react';

import { Layout } from '@Components/Layout';
import { WidgetData, WidgetTypes } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function AddWidgetButton(props: {
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.AddWidgetButton[language], []);

  const [showModal, setShowlModal] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');

  function whenLabelValid(callback: () => void) {
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
    <Layout.Button.IconRounded
      iconName="list"
      showPlusSign={true}
      color_background={theme.confirm}
      color={theme.onConfirm}
      onPress={() => setShowlModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title={stringResources['Add Widget']}
        onRequestClose={() => setShowlModal(false)}
      >
        <Layout.View
          style={{
            padding: 5,
          }}
        >
          <Layout.Input.String
            label={stringResources['Widget name']}
            placeholder={stringResources['Write a name to the widget here...']}
            value={label}
            locked={false}
            onChangeText={(text) => setLabel(text)}
          />
          <Layout.View
            style={{
              marginTop: 10,
              marginHorizontal: 5,
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor: theme.secondary,
            }}
          >
            <Layout.ScrollView
              contenContainerStyle={{
                gap: 2,
                paddingBottom: 0,
              }}
            >
              <Layout.Button.Text
                title={stringResources['Boolean']}
                color_background={theme.tertiary}
                color_font={theme.onTertiary}
                onPress={() => onPress('boolean')}
              />
              <Layout.Button.Text
                title={stringResources['Text']}
                color_background={theme.tertiary}
                color_font={theme.onTertiary}
                onPress={() => onPress('text')}
              />
            </Layout.ScrollView>
          </Layout.View>
        </Layout.View>
      </Layout.Modal>
    )}
  </>);
}
