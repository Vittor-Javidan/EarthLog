import React, { useMemo } from 'react';
import { Text as ReactNative_Text, StyleProp, ViewStyle } from 'react-native';

import { ThemeDTO } from '@Types/index';

import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import Root from './Root';

export default function Text(props: {
	title: string
	color_background?: string
	color_font?: string
	style?: StyleProp<ViewStyle>
	onPress: () => void
}): JSX.Element {

	const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

	const backgroundColor = props.color_background ? props.color_background : theme.secondary;
	const textColor = props.color_font ? props.color_font : theme.onSecondary;

	return (
		<Root
      color_background={backgroundColor}
      onPress={props.onPress}
      style={[{
				borderColor: theme.tertiary,
        borderWidth: 1,
			}, props.style]}
    >
      <ReactNative_Text
				adjustsFontSizeToFit={true}
				maxFontSizeMultiplier={0}
				style={{
					fontSize: ThemeService.FONTS.h2,
          color: textColor,
				}}
			>
				{props.title}
			</ReactNative_Text>
		</Root>
	);
}
