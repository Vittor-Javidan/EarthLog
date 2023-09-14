import React, { useMemo } from 'react';
import { View, StyleProp, ViewStyle, Platform, TextStyle } from 'react-native';

import ConfigService from '@Services/ConfigService';

import RootButton from './Root';
import RootText from '../Text/Root';
import { Icon, IconName } from '../Icon';
import ThemeService from '@Services/ThemeService';

export default function TextWithIcon(props: {
	title: string
  iconSide: 'Left' | 'Right'
  iconName: IconName
	color_background?: string
	color_font?: string
	style?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
	onPress: () => void
}): JSX.Element {

	const { theme } = useMemo(() => ConfigService.config, []);
	const backgroundColor = props.color_background ? props.color_background : theme.secondary;
	const textColor = props.color_font ? props.color_font : theme.onSecondary;
  const iosLargeTitle = Platform.OS === 'ios' && props.title.length >= 25;

	return (
		<RootButton
      color_background={backgroundColor}
      onPress={props.onPress}
      style={[{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: iosLargeTitle ? 5 : 10,
			}, props.style]}
    >
      {props.iconSide === 'Left' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={textColor}
          />
        </View>
      )}
      <RootText
				style={[{
					fontSize: iosLargeTitle ? ThemeService.FONTS.h3 : 200,
          color: textColor,
				}, props.styleText]}
			>
				{props.title}
			</RootText>
      {props.iconSide === 'Right' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={textColor}
          />
        </View>
      )}
		</RootButton>
	);
}
