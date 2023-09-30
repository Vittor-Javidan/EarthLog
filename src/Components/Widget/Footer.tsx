import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetRules, WidgetThemeDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import HapticsService from '@Services/HapticsService';
import ConfigService from '@Services/ConfigService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { NavbarIconButton } from './NavbarIconButtons';

export const Footer = memo((props: {
  addToNewSamples: boolean
  showCheckbox: boolean
  showDeleteWidgetButton: boolean
  rules: WidgetRules
  theme: WidgetThemeDTO
  onChangeCheckbox: (checked: boolean) => void
  onDeleteWidget: () => void
}) => {
  return (props.showCheckbox || props.showDeleteWidgetButton) ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: props.showCheckbox ? 'space-between' : 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <AddToNewSampleButton
        showCheckbox={props.showCheckbox}
        addToNewSamples={props.addToNewSamples}
        onChangeCheckbox={(boolean) => props.onChangeCheckbox(boolean)}
        rules={props.rules}
        theme={props.theme}
      />
      <DeleteWidgetButton
        showDeleteWidgetButton={props.showDeleteWidgetButton}
        onDeleteWidget={() => props.onDeleteWidget()}
        rules={props.rules}
        theme={props.theme}
      />
    </View>
  ) : <></>;
});

const DeleteWidgetButton = memo((props: {
  showDeleteWidgetButton: boolean
  rules: WidgetRules
  theme: WidgetThemeDTO
  onDeleteWidget: () => void
}) => {
  return (props.rules.showDeleteButton_Widget && props.showDeleteWidgetButton) ? (
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
  ) : <></>;
});

const AddToNewSampleButton = memo((props: {
  showCheckbox: boolean
  addToNewSamples: boolean
  rules: WidgetRules
  theme: WidgetThemeDTO
  onChangeCheckbox: (checked: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  const onChangeCheckbox = useCallback((checked: boolean) => {
    if (props.rules.unlockAddToNewSamples) {
      props.onChangeCheckbox(checked);
      HapticsService.vibrate('success');
    }
  }, [props.onChangeCheckbox, props.rules]);

  return (props.showCheckbox ? (
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
          value={props.addToNewSamples}
          onChange={(checked) => onChangeCheckbox(checked)}
          theme={props.theme}
        />
        <Text p
          style={{
            color: props.rules.unlockAddToNewSamples
              ? props.theme.font
              : props.theme.wrong,
          }}
        >
          {R['Add automatically']}
        </Text>
        {!props.rules.unlockAddToNewSamples && (
          <View
            style={{ height: 20 }}
          >
            <Icon
              iconName="lock-closed"
              color={props.theme.wrong}
            />
          </View>
        )}
      </View>
    ) : <></>);
});
