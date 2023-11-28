import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { WidgetData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import CacheService from '@V1/Services/CacheService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';

export const TemplateWidgetCopyDisplay = memo((props: {
  showDisplay: boolean
  onWidgetTemplateCopy: (widgetData: WidgetData) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.templateWidgetCopy[config.language], []);

  const TemplateWidgets = CacheService.allWidgets_Template.map((widgetData) => {
    if (
      widgetData.rules.template_AllowCopies === true &&
      widgetData.widgetName                 !== ''
    ) {
      return (
        <TemplateWidgetButton
          key={widgetData.id_widget}
          title={widgetData.widgetName}
          onPress={() => props.onWidgetTemplateCopy(deepCopy(widgetData))}
        />
      );
    }
  });

  return props.showDisplay ? (<>
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
  </>) : <></>;
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
