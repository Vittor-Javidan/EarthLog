import React, { useState } from 'react';
import { View, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';
import * as Vibration from 'expo-haptics';

import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Icon, IconName } from '@Icon/index';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export function TextWithIcon(props: {
	title: string
  iconSide: 'Left' | 'Right'
  iconName: IconName
  theme: ButtonTheme
  style?: StyleProp<ViewStyle>
	onPress: () => void
}): JSX.Element {

	const { theme } = props;
	const [pressed, setPressed] = useState<boolean>(false);
  const iosLargeTitle = Platform.OS === 'ios' && props.title.length >= 25;

	return (
		<Pressable
			onPressIn={async () => {
				setPressed(true);
				await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
			}}
			onPressOut={() => { setPressed(false); }}
			onPress={props.onPress}
			style={[{
        opacity: pressed ? 0.9 : 1,
				height: 55,
				width: '100%',
				paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: iosLargeTitle ? 5 : 10,
				backgroundColor: pressed ? theme.background_Pressed : theme.background,
			}, props.style]}
		>
      {props.iconSide === 'Left' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={pressed ? theme.font_Pressed : theme.font}
          />
        </View>
      )}
      <Text.Root
				style={{
					fontSize: iosLargeTitle ? ThemeService.FONTS.h3 : 200,
          color: pressed ? theme.font_Pressed : theme.font,
				}}
			>
				{props.title}
			</Text.Root>
      {props.iconSide === 'Right' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={pressed ? theme.font_Pressed : theme.font}
          />
        </View>
      )}
		</Pressable>
  );
}
