import React, { useState, useMemo } from 'react';
import { Text, StyleProp, ViewStyle, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import Icon, { IconName } from '../Icon';

export default function IconButtonRounded(props: {
  iconName: IconName
	showPlusSign: boolean
  color_background: string
	buttonDiameter?: number
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}): JSX.Element {

	const { theme } = useMemo(() => ConfigService.config, []);
	const [pressed, setPressed] = useState<boolean>(false);
	const diameter = props.buttonDiameter ?? 70;

	return (
    <Pressable
      onPressIn={async () => {
				setPressed(true);
				await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
			}}
      onPressOut={() => {
				setPressed(false);
			}}
      onPress={props.onPress}
      style={[{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? theme.onPressColorPrimary : props.color_background,
				height: diameter,
				width: diameter,
				borderRadius: 35,
        paddingVertical: 15,
				paddingHorizontal: 15,
				borderColor: theme.tertiary,
        borderWidth: 3,
      }, props.style]}
    >
			{props.showPlusSign && (
				<Text
					maxFontSizeMultiplier={0}
					adjustsFontSizeToFit={true}
					style={{
						color: props.color,
						fontSize: 25,
					}}
				>
					+
				</Text>
			)}
      <Icon
        iconName={props.iconName}
        color={props.color}
      />
		</Pressable>
	);
}
