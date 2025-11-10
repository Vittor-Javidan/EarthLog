import React, { useState, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { InputData, InputTypes, InputTypesArray, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { ProjectService } from '@V1/Services/ProjectService';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';
import { Animation } from '@V1/Animation/index';

export const NewInputDisplay = memo((props: {
  theme: WidgetTheme
  onCreate: (inputData: InputData) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

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

  return (
    <Animation.FadeOut
      duration={300}
    >
      <Text h3
        style={{
          color: props.theme.font,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
      >
        {R['Add a new input:']}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 5,
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 20,
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
