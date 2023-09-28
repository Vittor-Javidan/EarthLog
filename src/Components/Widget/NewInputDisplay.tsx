import React, { useState, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { InputData, InputTypes, InputTypesArray, WidgetThemeDTO } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export const NewInputDisplay = memo((props: {
  theme: WidgetThemeDTO
  onCreate: (inputData: InputData) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  const onCreate = useCallback((inputType: InputTypes) => {
    props.onCreate(ProjectService.getInputData(inputType));
  }, [props.onCreate]);

  return (
    <View>
      <Text h2
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
          paddingHorizontal: 10,
        }}
      >
        <AllButton
          theme={props.theme}
          onCreate={(inputType) => onCreate(inputType)}
        />
      </View>
    </View>
  );
});

const AllButton = memo((props: {
  theme: WidgetThemeDTO
  onCreate: (inputType: InputTypes) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);

  return InputTypesArray.map(type => (
    <Button
      key={type}
      title={R[type]}
      onPress={() => props.onCreate(type)}
      theme={props.theme}
    />
  ));
});

const Button = memo((props: {
  title: string,
  theme: WidgetThemeDTO
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
        opacity: pressed ? 0.9 : 1,
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
