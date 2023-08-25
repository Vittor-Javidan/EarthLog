import React, { useMemo } from 'react';
import ConfigService from '@Services/ConfigService';
import View from './View';

export default function StatusFeedback(props: {
  done: boolean
  error: boolean
  color_border?: string
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        height: 12,
        width: 12,
        backgroundColor: props.error ? theme.wrong : props.done ? theme.confirm : theme.modified,
        borderColor: props.color_border ? props.color_border : theme.background,
        borderWidth: 1,
        borderRadius: 6,
      }}
    />
  );
}
