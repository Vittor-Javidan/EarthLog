import React, { useState, useMemo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

export default function RootButton(props: {
  color_background?: string
	style?: StyleProp<ViewStyle>
  children: ReactNode
	onPress: () => void
}): JSX.Element {

	const { theme } = useMemo(() => ConfigService.config, []);
	const [pressed, setPressed] = useState<boolean>(false);
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
				justifyContent: 'center',
				alignItems: 'flex-start',
				backgroundColor: pressed ? theme.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
				height: 55,
				width: '100%',
				paddingHorizontal: 10,
				paddingVertical: 10,
			}, props.style]}
		>
      {props.children}
		</Pressable>
	);
}
