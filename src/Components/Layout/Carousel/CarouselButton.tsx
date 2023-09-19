import React, {  useMemo, memo } from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export const CarouselButton = memo((props: {
  title: string
  selected: boolean
  type: 'left' | 'middle' | 'right'
	onPress: () => void
}) => {

	const { theme } = useMemo(() => ConfigService.config, []);

  const leftPositionStyle: StyleProp<ViewStyle> = useMemo(() => props.type === 'left' ? {
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
        gap: 1,
				backgroundColor: props.selected ? theme.tertiary : theme.primary,
        flex: 1,
				paddingHorizontal: 5,
				paddingVertical: 5,
			}, leftPositionStyle, rightPositionStyle]}
		>
      <P
        style={{
          color: props.selected ? theme.onTertiary : theme.onPrimary,
          textDecorationLine: props.selected ? 'underline' : 'none',
          fontWeight: '900',
        }}
      >
        {props.title}
      </P>
		</Pressable>
	);
});

