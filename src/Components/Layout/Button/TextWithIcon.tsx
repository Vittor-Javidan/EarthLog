import React, { useMemo } from 'react';
import { StyleProp, ViewStyle, Platform } from 'react-native';

import ConfigService from '@Services/ConfigService';

import RootButton from './Root';
import RootText from '../Text/Root';
import Icon, { IconName } from '../Icon';
import ThemeService from '@Services/ThemeService';

export default function TextWithIcon(props: {
	title: string
  iconSide: 'Left' | 'Right'
  iconName: IconName
	color_background?: string
	color_font?: string
	style?: StyleProp<ViewStyle>
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
        <Icon
          iconName={props.iconName}
          color={textColor}
        />
      )}
      <RootText
				style={{
					fontSize: iosLargeTitle ? ThemeService.FONTS.h3 : 200,
          width: '80%',
          color: textColor,
				}}
			>
				{props.title}
			</RootText>
      {props.iconSide === 'Right' && (
        <Icon
          iconName={props.iconName}
          color={textColor}
        />
      )}
		</RootButton>
	);
}
