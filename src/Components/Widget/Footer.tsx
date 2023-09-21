import React from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { WidgetThemeData } from '@Types/ProjectTypes';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { NavbarIconButton } from './NavbarIconButtons';

export function Footer(props: {
  AddToNewSamples: boolean
  showCheckbox: boolean
  showDeleteWidgetButton: boolean
  theme: WidgetThemeData
  onChangeCheckbox: (checked: boolean) => void
  onDeleteWidget: () => void
}) {

  function onChangeCheckbox(checked: boolean) {
    props.onChangeCheckbox(checked);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  return (props.showCheckbox || props.showDeleteWidgetButton) ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: props.showCheckbox ? 'space-between' : 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {props.showCheckbox && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingBottom: 5,
            gap: 5,
          }}
        >
          <Button.Checkbox
            value={props.AddToNewSamples}
            onChange={(checked) => onChangeCheckbox(checked)}
            theme={props.theme}
          />
          <Text.P
            //TODO:  Add to translation files
            style={{ color: props.theme.font }}
          >
            Add to new samples
          </Text.P>
        </View>
      )}
      {props.showDeleteWidgetButton && (
        <View
          style={{ height: 40 }}
        >
          <NavbarIconButton
            iconName="trash-outline"
            position="bottom right"
            selected={true}
            onPress={() => props.onDeleteWidget()}
            theme={{
              font: props.theme.wrong,
              background: props.theme.background,
            }}
          />
        </View>
      )}
    </View>
  ) : <></>;
}
