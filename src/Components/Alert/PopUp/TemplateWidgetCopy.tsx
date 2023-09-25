import React, { useMemo, useState, memo } from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import { WidgetData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import HapticsService from '@Services/HapticsService';
import ProjectService from '@Services/ProjectService';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';

export const TemplateWidgetCopy = memo((props: {
  id_project: string | undefined
  id_sample: string | undefined
  onFinish: () => void
}) => {

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
          props.onFinish();
          await AlertService.runAcceptCallback();
        },
        (errorMesage) => {
          alert(errorMesage);
          HapticsService.vibrate('warning');
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
        gap: 10,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
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
          alignItems: 'center',
          paddingHorizontal: 5,
          gap: 5,
        }}
      >
        {TemplateWidgets}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="close"
          onPress={() => props.onFinish()}
          theme={{
            font: theme.font,
            font_Pressed: theme.wrong,
            background: theme.wrong,
            background_Pressed: theme.background_active,
          }}
          style={{
            flex: 0.5,
            height: 40,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
});

const TemplateWidgetButton = memo((props: {
  title: string
  theme: {
    font: string;
    background: string;
    background_Button: string;
  }
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    HapticsService.vibrate('success');
  }

  function onPress() {
    props.onPress();
    HapticsService.vibrate('success');
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
            textAlign: 'center',
          }}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
});
