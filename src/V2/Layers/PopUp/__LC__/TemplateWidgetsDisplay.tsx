import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import {
  WidgetData
} from '@V2/Types';

import { deepCopy } from '@V2/Globals/DeepCopy';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';

import { Text } from '@V2/Text/index';

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
        {R['Your Forms:']}
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
