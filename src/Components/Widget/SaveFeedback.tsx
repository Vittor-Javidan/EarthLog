import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetThemeDTO } from '@Types/ProjectTypes';

import { Text } from '@Text/index';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export const SaveFeedback = memo((props: {
  saved: boolean
  theme: WidgetThemeDTO
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <View
        style={{
          height: 12,
          width: 12,
          backgroundColor: props.saved ? props.theme.confirm : props.theme.modified,
          borderRadius: 6,
        }}
      />
      <Text p
        style={{
          color: props.theme.font,
        }}
      >
        {props.saved ? R['Saved'] : R['Saving...']}
      </Text>
    </View>
  );
});
