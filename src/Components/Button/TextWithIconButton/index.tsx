import React, { useState, memo, useCallback } from 'react';
import { View, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';

import FontService from '@Services/FontService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
import { Icon, IconName } from '@Icon/index';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export const TextWithIcon = memo((props: {
	title: string
  iconSide: 'Left' | 'Right'
  iconName: IconName
  theme: ButtonTheme
  style?: StyleProp<ViewStyle>
	onPress: () => void
}) => {

	const [pressed, setPressed] = useState<boolean>(false);
  const iosLargeTitle = Platform.OS === 'ios' && props.title.length >= 25;

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);


	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => { setPressed(false); }}
			onPress={() => onPress()}
			style={[{
        opacity: pressed ? 0.9 : 1,
				height: 55,
				width: '100%',
				paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: iosLargeTitle ? 5 : 10,
				backgroundColor: pressed ? props.theme.background_Pressed : props.theme.background,
			}, props.style]}
		>
      {props.iconSide === 'Left' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={pressed ? props.theme.font_Pressed : props.theme.font}
          />
        </View>
      )}
      <Text
				style={{
					fontSize: iosLargeTitle ? FontService.FONTS.h3 : 200,
          color: pressed ? props.theme.font_Pressed : props.theme.font,
				}}
			>
				{props.title}
			</Text>
      {props.iconSide === 'Right' && (
        <View
          style={{ paddingVertical: iosLargeTitle ? 5 : 0}}
        >
          <Icon
            iconName={props.iconName}
            color={pressed ? props.theme.font_Pressed : props.theme.font}
          />
        </View>
      )}
		</Pressable>
  );
});
