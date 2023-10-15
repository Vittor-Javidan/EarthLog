import React, { useMemo, useState, memo, useCallback } from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import { translations } from '@Translations/index';
import { WidgetData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import HapticsService from '@Services/HapticsService';
import ProjectService from '@Services/ProjectService';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { LC } from '@Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const TemplateWidgetCopy = memo((props: {
  id_project: string
  id_sample: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.templateWidgetCopy[config.language], []);

  const onWidgetCopyToSample = useCallback(async (widgetData: WidgetData) => {

    const newWidgetData = UtilService.deepCopy(widgetData);
    newWidgetData.id_widget = UtilService.generateUuidV4();

    await ProjectService.createWidget_Sample(props.id_project, props.id_sample, newWidgetData,
      async () => {
        CacheService.addToAllWidgets_Sample(newWidgetData);
        await SyncService.syncData_SampleWidgets(props.id_project, props.id_sample, newWidgetData.id_widget, 'creation');
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMesage) => alert(errorMesage),
    );

  }, [props]);

  const TemplateWidgets = CacheService.allWidgets_Template.map((widgetData) => {
    if (
      widgetData.rules.template_AllowCopies === true &&
      widgetData.widgetName                 !== ''
    ) {
      return (
        <TemplateWidgetButton
          key={widgetData.id_widget}
          title={widgetData.widgetName}
          onPress={() => onWidgetCopyToSample(widgetData)}
        />
      );
    }
  });

  return (
    <LC.PopUp>
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
            color: theme.font,
          }}
        >
          {R['Your widgets:']}
        </Text>
      </View>
      <ScrollView
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
      <FooterButtons
       onCancel={() => props.closeModal()}
      />
    </LC.PopUp>
  );
});

const TemplateWidgetButton = memo((props: {
  title: string
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

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
          backgroundColor: pressed ? theme.background_active : theme.background_Button,
        }}
      >
        <Text h3
          style={{
            color: pressed ? theme.font_active : theme.font_button,
            textAlign: 'center',
          }}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
});
