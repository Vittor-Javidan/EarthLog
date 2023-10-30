import React, { useMemo, memo, useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import { translations } from '@Translations/index';
import { WidgetData } from '@Types/ProjectTypes';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import ProjectService from '@Services/ProjectService';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';

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
    const newWidgetData = ProjectService.changeAllIds(UtilService.deepCopy(widgetData));
    await ProjectService.createWidget({
      path: 'sample widgets',
      id_project: props.id_project,
      id_sample: props.id_sample,
      widgetData: newWidgetData,
      sync: true,
    }, () => {
      CacheService.addToAllWidgets_Sample(newWidgetData);
      AlertService.runAcceptCallback();
      props.closeModal();
    }, (errorMesage) => alert(errorMesage));
  }, [props]);

  const TemplateWidgets = CacheService.allWidgets_Template.map((widgetData) => {
    if (
      widgetData.rules.template_AllowCopies === true &&
      widgetData.widgetName                 !== ''
    ) {
      return (
        <LC.FlexButton
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
