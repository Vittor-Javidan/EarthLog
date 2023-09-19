import React from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { WidgetThemeData } from '@Types/ProjectTypes';

import { Text } from '@Components/Text';
import { Button } from '@Components/Button';

export function AutogenerateCheckbox(props: {
  value: boolean
  theme: WidgetThemeData
  showCheckbox: boolean
  onChange: (checked: boolean) => void
}) {

  const { value, theme, showCheckbox } = props;

  function onChange(checked: boolean) {
    props.onChange(checked);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  return showCheckbox ? (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop:10,
        gap: 5,
      }}
    >
      <Button.Checkbox
        value={value}
        onChange={(checked) => onChange(checked)}
        theme={theme}
      />
      <Text.P
        //TODO:  Add to translation files
        style={{ color: theme.font }}
      >
        Autogenerate
      </Text.P>
    </View>
  ) : <></>;
}
