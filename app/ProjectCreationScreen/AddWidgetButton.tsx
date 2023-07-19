import React, { useState, useMemo, ReactNode } from 'react';
import { View } from 'react-native';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

import { translations } from '@Translations/index';
import { Translations_ProjectCreationScreen } from '@Translations/Screens/ProjectCreationScreen';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import ProjectService, { WidgetData, WidgetLabel, WidgetName } from '@Services/ProjectService';

export default function AddWidgetButton(props: {
  widgets: Record<WidgetLabel, WidgetData>
  onCreateWidget: (label: WidgetLabel, widgetData: WidgetData) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_ProjectCreationScreen[Languages]>(() => {
    return translations.Screens.ProjectCreationScreen[ConfigService.config.language];
  }, []);

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
      title={stringResources['Add']}
      onPress={() => setShowlModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title={stringResources['Add Widget']}
        onRequestClose={() => setShowlModal(false)}
      >
        <Layout.View>
          <Input.String
            label={stringResources['Widget name']}
            backgroundColor_Label={theme.tertiary}
            backgroundColor_Value={theme.background}
            color_Label={theme.onTertiary}
            color_Value={theme.onBackground}
            color_Placeholder={theme.onBackground_Placeholder}
            placeholder={stringResources['Write a name to the widget here...']}
            value={label}
            onChangeText={setLabel}
            onResetPress={() => setLabel('')}
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button
              title={stringResources['Boolean']}
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => onPress('BooleanWidget')}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button
              title={stringResources['Text']}
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
