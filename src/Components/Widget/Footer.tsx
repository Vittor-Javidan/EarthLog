import React, { memo } from 'react';
import { View } from 'react-native';

import { WidgetThemeDTO } from '@Types/ProjectTypes';
import ApticsService from '@Services/ApticsService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { NavbarIconButton } from './NavbarIconButtons';

export const Footer = memo((props: {
  AddToNewSamples: boolean
  showCheckbox: boolean
  showDeleteWidgetButton: boolean
  theme: WidgetThemeDTO
  onChangeCheckbox: (checked: boolean) => void
  onDeleteWidget: () => void
}) => {

  function onChangeCheckbox(checked: boolean) {
    props.onChangeCheckbox(checked);
    ApticsService.vibrate('success');
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
          <Text p
            style={{ color: props.theme.font }}
          >
            Add to new samples
          </Text>
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
});
