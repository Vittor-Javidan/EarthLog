import React from 'react';
import { View } from 'react-native';

import { WidgetThemeData } from '@Types/ProjectTypes';
import { Text } from '@Components/Text';


export default function SaveFeedback(props: {
  saved: boolean
  theme: WidgetThemeData
}) {

  const { theme, saved } = props;

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
          backgroundColor: saved ? theme.confirm : theme.modified,
          borderRadius: 6,
        }}
      />
      <Text.P
        style={{
          color: theme.font,
        }}
      >
        {saved ? 'Saved' : 'Saving...'}
      </Text.P>
    </View>
  );
}
