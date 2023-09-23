import React, {  useMemo, memo } from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Icon, IconName } from '@Icon/index';

export const CarouselButton = memo((props: {
  title: string
  selected: boolean
  type: 'left' | 'middle' | 'right'
  iconName?: IconName
	onPress: () => void
}) => {

	const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.carouselButton, []);

  const leftPositionStyle: StyleProp<ViewStyle>  = useMemo(() => props.type === 'left' ? {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  } : undefined, []);
  const rightPositionStyle: StyleProp<ViewStyle> = useMemo(() => props.type === 'right' ? {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  } : undefined, []);

  function onPressIn(selected: boolean) {
    if (!selected) {
      Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
      props.onPress();
    }
  }

	return (
		<Pressable
			onPressIn={() => onPressIn(props.selected)}
			style={[{
        flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
        gap: 5,
				backgroundColor: props.selected ? theme.background_active : theme.background,
        flex: 1,
				paddingHorizontal: 5,
        paddingVertical: 2,
			}, leftPositionStyle, rightPositionStyle]}
		>
      {props.title !== '' && (
        <Text.P
          style={{
            color: props.selected ? theme.font_active : theme.font,
            textDecorationLine: props.selected ? 'underline' : 'none',
            fontWeight: '900',
          }}
        >
          {props.title}
        </Text.P>
      )}
      {props.iconName !== undefined && (
        <Icon
          color={props.selected ? theme.font_active : theme.font}
          iconName={props.iconName}
        />
      )}
		</Pressable>
	);
});

