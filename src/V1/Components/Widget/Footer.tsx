import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetRules, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';
import { Button } from '@V1/Button/index';
import { NavbarIconButton } from './NavbarIconButtons';

export const Footer = memo((props: {
  addToNewSamples: boolean
  isTemplate: boolean
  editInputs: boolean
  rules: WidgetRules
  theme: WidgetTheme
  onChangeCheckbox: (checked: boolean) => void
  onDeleteWidget: () => void
}) => {
  return (props.isTemplate || props.editInputs) ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: props.isTemplate ? 'space-between' : 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {props.isTemplate && (
        <AddToNewSampleButton
          addToNewSamples={props.addToNewSamples}
          onChangeCheckbox={(boolean) => props.onChangeCheckbox(boolean)}
          rules={props.rules}
          theme={props.theme}
        />
      )}
      {props.editInputs && (
        <DeleteWidgetButton
          isTemplate={props.isTemplate}
          onDeleteWidget={() => props.onDeleteWidget()}
          rules={props.rules}
          theme={props.theme}
        />
      )}
    </View>
  ) : <></>;
});

const DeleteWidgetButton = memo((props: {
  isTemplate: boolean
  rules: WidgetRules
  theme: WidgetTheme
  onDeleteWidget: () => void
}) => {

  const showButton = (
    props.isTemplate &&
    props.rules.template_ShowDeleteButton_Widget === true
  ) || (
    !props.isTemplate &&
    props.rules.showDeleteButton_Widget === true
  );

  return showButton ? (
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
  addToNewSamples: boolean
  rules: WidgetRules
  theme: WidgetTheme
  onChangeCheckbox: (checked: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  const onChangeCheckbox = useCallback((checked: boolean) => {
    if (props.rules.template_unlockAddAutomatically) {
      props.onChangeCheckbox(checked);
      HapticsService.vibrate('success');
    }
  }, [props.onChangeCheckbox, props.rules]);

  return (
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
          color: props.rules.template_unlockAddAutomatically
            ? props.theme.font
            : props.theme.wrong,
        }}
      >
        {R['Add automatically']}
      </Text>
      {!props.rules.template_unlockAddAutomatically && (
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
  );
});
