import React, {  useMemo, memo, useCallback } from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';

import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';
import { Icon, IconName } from '@V1/Icon/index';

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

  const onPressIn = useCallback(() => {
    if (!props.selected) {
      HapticsService.vibrate('success');
      props.onPress();
    }
  }, [props.selected, props.onPress]);

	return (
		<Pressable
			onPressIn={() => onPressIn()}
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
        <Text p
          style={{
            color: props.selected ? theme.font_active : theme.font,
            fontWeight: '900',
          }}
        >
          {props.title}
        </Text>
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

