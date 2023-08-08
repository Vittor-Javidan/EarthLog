import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import RootButton from './Root';
import RootText from '../Text/Root';
import Icon, { IconName } from '../Icon';

export default function TextWithIcon(props: {
	title: string
  iconSide: 'Left' | 'Right'
  iconName: IconName
	color_background?: string
	color_font?: string
	style?: StyleProp<ViewStyle>
	onPress: () => void
}): JSX.Element {

	const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

	const backgroundColor = props.color_background ? props.color_background : theme.secondary;
	const textColor = props.color_font ? props.color_font : theme.onSecondary;

	return (
		<RootButton
      color_background={backgroundColor}
      onPress={props.onPress}
      style={[{
        flexDirection: 'row',
        justifyContent: 'space-between',
				borderColor: theme.tertiary,
        borderWidth: 1,
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
					fontSize: 200,
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
