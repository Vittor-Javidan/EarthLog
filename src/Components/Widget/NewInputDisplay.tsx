import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { InputData, InputTypes, InputTypesArray, WidgetThemeData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';

import { Text } from '@Text/index';

export function NewInputDisplay(props: {
  theme: WidgetThemeData
  onCreate: (inputData: InputData) => void
}) {

  const { theme } = props;

  function onCreate(inputType: InputTypes) {
    props.onCreate(ProjectService.getInputData(inputType));
  }

  const AllButtons = InputTypesArray.map(type => (
    <Button
      key={type}
      title={type}
      onPress={(inputType) => onCreate(inputType)}
      theme={theme}
    />
  ));

  return (<>
    <Text.H2
      style={{
        color: theme.font,
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}
    >
      {'Select a new Input:'}
    </Text.H2>
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
      {AllButtons}
    </View>
  </>);
}

function Button(props: {
  title: InputTypes,
  theme: WidgetThemeData
  onPress: (inputType: InputTypes) => void
}) {

  const { title, theme } = props;
	const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressOut() {
    setPressed(false);
  }

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => onPressOut()}
			onPress={() => props.onPress(title)}
			style={{
        opacity: pressed ? 0.9 : 1,
				paddingHorizontal: 10,
        paddingVertical: 2,
				backgroundColor: pressed ? theme.confirm : theme.font,
        borderRadius: 100,
			}}
		>
      <Text.P
				style={{
          color: theme.background,
				}}
			>
				{props.title}
			</Text.P>
		</Pressable>
  );
}
