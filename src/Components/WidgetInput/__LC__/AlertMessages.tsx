import React, { memo } from 'react';
import { View } from 'react-native';

import { InputAlertMessage, WidgetTheme } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

export const AlertMessages = memo((props: {
  alertMessages: InputAlertMessage
  theme: WidgetTheme
}) => {

  if (Object.keys(props.alertMessages).length <= 0) {
    return <></>;
  }

  const Messages = Object.values(props.alertMessages).map((alertMessage) => (
    <Text p
      key={alertMessage}
      style={{
        color: props.theme.warning,
      }}
    >
      {alertMessage}
    </Text>
  ));

  return (
    <View
      style={{
        alignItems: 'flex-start',
        paddingHorizontal: 10,
      }}
    >
      {Messages}
    </View>
  );
});
