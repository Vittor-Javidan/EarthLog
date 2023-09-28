import React, { useMemo, useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import HapticsService from '@Services/HapticsService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { GPSInputTheme } from '../ThemeType';

export const ManualInputButton = memo((props: {
  theme: GPSInputTheme
	onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.gpsInput[config.language], []);
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
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingVertical: 5,
				paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: props.theme.font,
        borderRadius: 10,
				backgroundColor: pressed ? props.theme.background : props.theme.font,
			}}
		>
      <Text
				style={{
					fontSize: 200,
          color: pressed ? props.theme.font : props.theme.background,
				}}
			>
				{R['Manual']}
			</Text>
      <Icon
        iconName="pencil-sharp"
        color={pressed ? props.theme.font : props.theme.background}
      />
		</Pressable>
  );
});
