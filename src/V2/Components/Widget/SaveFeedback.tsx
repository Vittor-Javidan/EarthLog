import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';

import { Text } from '@V2/Text/index';

export const SaveFeedback = memo((props: {
  saved: boolean
  theme: WidgetTheme
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
          backgroundColor: props.saved ? props.theme.confirm : props.theme.warning,
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
