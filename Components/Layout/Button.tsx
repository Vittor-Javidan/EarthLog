import React, { useState, useMemo } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';

import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

export default function Button(props: {
	title: string
	overrideBackgroundColor?: string
	overrideTextColor?: string
	onPress: ((event: GestureResponderEvent) => void)
}): JSX.Element {

	const [pressed, setPressed] = useState<boolean>(false);
	const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

	const backgroundColor = props.overrideBackgroundColor ? props.overrideBackgroundColor : theme.secondary;
	const textColor = props.overrideTextColor ? props.overrideTextColor : theme.onSecondary;

	return (
		<Pressable
			onPressIn={() => { setPressed(true); }}
			onPressOut={() => { setPressed(false); }}
			onPress={props.onPress}
			style={{
				flex: 1,
				alignItems: 'center',
				backgroundColor: pressed ? theme.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
				padding: 10,
				borderWidth: 1,
				borderColor: theme.tertiary,
			}}
		>
			<Text
				adjustsFontSizeToFit={true}
				maxFontSizeMultiplier={0}
				style={{
					fontSize: ThemeService.FONTS.h2,
          color: textColor,
				}}
			>
				{props.title}
			</Text>
		</Pressable>
	);
}
