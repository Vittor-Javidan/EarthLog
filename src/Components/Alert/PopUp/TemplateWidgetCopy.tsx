import React, { useMemo, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import { Text } from '@Text/index';
import ApticsService from '@Services/ApticsService';
import { Button } from '@Button/index';
import { WidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';

export default function TemplateWidgetCopy(props: {
  id_project: string | undefined
  id_sample: string | undefined
  onAccept: () => void
  onRefuse: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  async function onWidgetCopyToSample(widgetData: WidgetData) {
    if (props.id_project !== undefined && props.id_sample !== undefined) {
      const { id_project, id_sample } = props;
      const newWidgetData = UtilService.deepCopy(widgetData);
      newWidgetData.id_widget = ProjectService.generateUuidV4();
      await ProjectService.createWidget_Sample(
        id_project,
        id_sample,
        newWidgetData,
        async () => {
          await CacheService.loadAllWidgets_Sample(id_project, id_sample);
          props.onAccept();
          await AlertService.runAcceptCallback();
        },
        (errorMesage) => {
          alert(errorMesage);
          ApticsService.vibrate('warning');
        }
      );
    } else {
      alert('No project/sample ID found');
    }
  }

  const TemplateWidgets = CacheService.allWidgets_Template.map((widgetData) => (
    <TemplateWidgetButton
      key={widgetData.id_widget}
      title={widgetData.widgetName}
      theme={theme}
      onPress={() => onWidgetCopyToSample(widgetData)}
    />
  ));

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.background,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        gap: 10,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text h3
          style={{
            textAlign: 'center',
          }}
        >
          {'Your Widgets:'}
        </Text>
      </View>
      <ScrollView
        style={{
          maxHeight: 250,
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        {TemplateWidgets}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="close"
          onPress={() => props.onRefuse()}
          theme={{
            font: theme.font,
            font_Pressed: theme.wrong,
            background: theme.wrong,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}

function TemplateWidgetButton(props: {
  title: string
  theme: {
    font: string;
    background: string;
    background_Button: string;
  }
  onPress: () => void
}) {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    props.onPress();
    ApticsService.vibrate('success');
  }

  return (
    <View>
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          backgroundColor: pressed ? props.theme.background : props.theme.background_Button,
        }}
      >
        <Text h3
          style={{
            color: props.theme.background,
          }}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
}
