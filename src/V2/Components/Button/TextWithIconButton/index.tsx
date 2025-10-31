import React, { useState, memo, useCallback } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { HapticsService } from '@V2/Services/HapticsService';

import { Text } from '@V2/Text/index';
import { Icon, IconName } from '@V2/Icon/index';

type ButtonTheme = {
  font: string
  font_active: string
  background: string
  background_active: string
}

export const TextWithIcon = memo((props: {
	title: string
  iconName: IconName
  theme: ButtonTheme
  iconSize?: number
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
        gap: 10,
				backgroundColor: pressed ? props.theme.background_active : props.theme.background,
			}, props.style]}
		>
      <Text h2
				style={{
          flex: 1,
          color: pressed ? props.theme.font_active : props.theme.font,
				}}
			>
				{props.title}
			</Text>
      <View
        style={{
          height: 45,
          paddingVertical: 5,
          justifyContent: 'center',
        }}
      >
        <Icon
          iconName={props.iconName}
          color={pressed ? props.theme.font_active : props.theme.font}
          fontSize={props.iconSize || 30}
        />
      </View>
		</Pressable>
  );
});
