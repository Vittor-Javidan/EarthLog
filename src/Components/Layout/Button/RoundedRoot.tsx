import React, { useState, useMemo } from 'react';
import { Text, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';

import { ThemeDTO } from '@Types/index';
import Icon, { IconName } from '../Icon';

import ConfigService from '@Services/ConfigService';

export default function IconButtonRounded(props: {
  iconName: IconName
	showPlusSign: boolean
  color_background: string
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}): JSX.Element {

	const [pressed, setPressed] = useState<boolean>(false);
	const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

	return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={[{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? theme.onPressColorPrimary : props.color_background,
				height: 80,
				width: 80,
				borderRadius: 80,
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
