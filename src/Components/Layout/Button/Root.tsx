import React, { useState, useMemo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';

export default function Root(props: {
  color_background?: string
	style?: StyleProp<ViewStyle>
  children: ReactNode
	onPress: () => void
}): JSX.Element {

	const [pressed, setPressed] = useState<boolean>(false);
	const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

	const backgroundColor = props.color_background ? props.color_background : theme.secondary;

	return (
		<Pressable
			onPressIn={async () => {
				setPressed(true);
				await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
			}}
			onPressOut={() => { setPressed(false); }}
			onPress={props.onPress}
			style={[{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: pressed ? theme.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
				height: 55,
			}, props.style]}
		>
      {props.children}
		</Pressable>
	);
}
