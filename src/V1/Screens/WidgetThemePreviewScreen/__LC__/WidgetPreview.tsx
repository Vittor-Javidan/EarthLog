import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { ThemeNames_Widgets } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';
import { Layout } from '@V1/Layout/index';
import { WidgetInput } from '@V1/WidgetInput/index';

export const WidgetPreview = memo((props: {
  themeName: ThemeNames_Widgets
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.widgetThemePreview[config.language], []);
  const theme = ThemeService.widgetThemes[props.themeName];

  return (
    <Layout.PseudoWidget
      saved={true}
      theme={theme}
    >
      <View
        style={{
          gap: 5,
        }}
      >
        <Text h2
          style={{
            textAlign: 'center',
            color: theme.font,
            paddingHorizontal: 5,
          }}
        >
          {R['Widget preview']}
        </Text>
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: R['Text'],
            value: '',
            type: 'string',
            placeholder: R['Write Something here'],
            lockedLabel: true,
            lockedData: false,
          }}
          multiline={false}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onSave={() => {}}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          widgetRules={{}}
          theme={theme}
        />
        <WidgetInput.Boolean
          inputData={{
            id_input: '',
            label: R['True/False'],
            value: true,
            type: 'boolean',
            notApplicable: false,
            lockedLabel: true,
            lockedData: false,
          }}
          onSave={() => {}}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          widgetRules={{}}
          theme={theme}
        />
        <WidgetInput.GPS
          inputData={{
            id_input: '',
            label: R['GPS'],
            value: {},
            type: 'gps',
            lockedLabel: true,
            lockedData: false,
          }}
          onSave={() => {}}
          referenceGPSData={undefined}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          widgetRules={{}}
          theme={theme}
        />
      </View>
    </Layout.PseudoWidget>
  );
});