import React, { useMemo } from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function CarouselButton(props: {
  title: string
  selected: boolean
  type: 'left' | 'middle' | 'right'
	onPress: () => void
}): JSX.Element {

	const { theme } = useMemo(() => ConfigService.config, []);

  async function onPressIn() {
    if (!props.selected) {
      props.onPress();
      Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
    }
  }

  const leftPositionStyle: StyleProp<ViewStyle> = props.type === 'left' ? {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  } : undefined;

  const rightPositionStyle: StyleProp<ViewStyle> = props.type === 'right' ? {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  } : undefined;

	return (
		<Pressable
			onPressIn={async () => onPressIn()}
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
}
