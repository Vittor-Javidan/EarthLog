import React, { useState, memo, useCallback } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import HapticsService from '@V1/Services/HapticsService';

import { Text } from '@V1/Text/index';
import { Icon, IconName } from '@V1/Icon/index';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export const TextWithIcon = memo((props: {
	title: string
  iconName: IconName
  theme: ButtonTheme
  style?: StyleProp<ViewStyle>
	onPress: () => void
}) => {

	const [pressed, setPressed] = useState<boolean>(false);

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
				width: '100%',
				paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
				backgroundColor: pressed ? props.theme.background_Pressed : props.theme.background,
			}, props.style]}
		>
      <Text h2
				style={{
          color: pressed ? props.theme.font_Pressed : props.theme.font,
				}}
			>
				{props.title}
			</Text>
      <View
        style={{
          height: 45,
          paddingVertical: 5,
        }}
      >
        <Icon
          iconName={props.iconName}
          color={pressed ? props.theme.font_Pressed : props.theme.font}
        />
      </View>
		</Pressable>
  );
});
