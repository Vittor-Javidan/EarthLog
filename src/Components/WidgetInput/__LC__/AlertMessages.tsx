import React from 'react';
import { View } from 'react-native';

import { InputAlertMessage } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

type AlertTheme = {
  modified: string
}

export function AlertMessages(props: {
  alertMessages: InputAlertMessage | undefined
  theme: AlertTheme
}) {

  if (props.alertMessages === undefined || Object.keys(props.alertMessages).length <= 0) {
    return <></>;
  }

  const Messages = Object.values(props.alertMessages).map(alertMessage => (
    <Text.P
      key={alertMessage}
      style={{
        color: props.theme.modified,
      }}
    >
      {alertMessage}
    </Text.P>
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
}
