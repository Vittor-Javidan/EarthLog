import React, { useState } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import APPColors from '../../Globals/Colors';

export default function LayoutButton(props: {
	title: string
	overrideBackgroundColor?: string
	overrideTextColor?: string
	onPress: ((event: GestureResponderEvent) => void)
}): JSX.Element {

	const [pressed, setPressed] = useState<boolean>(false);
	const backgroundColor = props.overrideBackgroundColor ? props.overrideBackgroundColor : APPColors.secondary;
	const textColor = props.overrideTextColor ? props.overrideTextColor : APPColors.onSecondary;

	return (
		<Pressable
			onPressIn={() => { setPressed(true); }}
			onPressOut={() => { setPressed(false); }}
			onPress={props.onPress}
			style={{
				width: '100%',
				alignItems: 'center',
				backgroundColor: pressed ? APPColors.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
				padding: 10,
			}}
		>
			<Text
				adjustsFontSizeToFit={true}
				style={{
					fontSize: 24,
          color: textColor,
				}}
			>
				{props.title}
			</Text>
		</Pressable>
	);
}
