import React, { memo } from 'react';
import { View } from 'react-native';

import { InputAlertMessage } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

type AlertTheme = {
  modified: string
}

export const AlertMessages = memo((props: {
  alertMessages: InputAlertMessage | undefined
  theme: AlertTheme
}) => {

  if (props.alertMessages === undefined || Object.keys(props.alertMessages).length <= 0) {
    return <></>;
  }

  const Messages = Object.values(props.alertMessages).map(alertMessage => (
    <Text p
      key={alertMessage}
      style={{
        color: props.theme.modified,
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
