import React, { useState, memo, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';

import { InputData, InputTypes, InputTypesArray, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ProjectService from '@V2/Services/ProjectService';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';

import { Text } from '@V2/Text/index';
import { Animation } from '@V2/Animation/index';

export const NewInputDisplay = memo((props: {
  theme: WidgetTheme
  onCreate: (inputData: InputData) => void
}) => {

  const config                               = useMemo(() => ConfigService.config, []);
  const R                                    = useMemo(() => translations.widget.Root[config.language], []);
  const [startAnimation , setStartAnimation] = useState<boolean>(false);

  const onCreate = useCallback((inputType: InputTypes) => {
    props.onCreate(ProjectService.getInputData({ inputType }));
  }, [props.onCreate]);

  const AllButtons = InputTypesArray.map(type => (
    <Button
      key={type}
      title={R[type]}
      onPress={() => onCreate(type)}
      theme={props.theme}
    />
  ));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Animation.FadeOut
      start={startAnimation}
      duration={300}
      onLayout={event => onLayout(event)}
    >
      <Text h3
        style={{
          color: props.theme.font,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
      >
        {R['Add a new field:']}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 5,
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {AllButtons}
      </View>
    </Animation.FadeOut>
  );
});

const Button = memo((props: {
  title: string,
  theme: WidgetTheme
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
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
				paddingHorizontal: 10,
        paddingVertical: 2,
				backgroundColor: pressed ? props.theme.confirm : props.theme.font,
        borderRadius: 100,
			}}
		>
      <Text p
				style={{
          color: props.theme.background,
				}}
			>
				{props.title}
			</Text>
		</Pressable>
  );
});
