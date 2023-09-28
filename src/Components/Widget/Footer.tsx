import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetThemeDTO } from '@Types/ProjectTypes';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { NavbarIconButton } from './NavbarIconButtons';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export const Footer = memo((props: {
  AddToNewSamples: boolean
  showCheckbox: boolean
  showDeleteWidgetButton: boolean
  theme: WidgetThemeDTO
  onChangeCheckbox: (checked: boolean) => void
  onDeleteWidget: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  const onChangeCheckbox = useCallback((checked: boolean) => {
    props.onChangeCheckbox(checked);
    HapticsService.vibrate('success');
  }, [props.onChangeCheckbox]);

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
            {R['Add automatically']}
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
