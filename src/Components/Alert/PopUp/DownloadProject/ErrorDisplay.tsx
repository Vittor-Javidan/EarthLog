import React, { memo } from 'react';

import { Text } from '@Text/index';

export const ErrorDisplay = memo((props: {
  showDisplay: boolean
  error: string | null
}) => {
  return props.showDisplay ? (<>
    <Text h3
      style={{
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}
    >
      {'Error'}
    </Text>
    <Text p
      style={{
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}
    >
      {props.error ?? ''}
    </Text>
  </>) : <></>;
});
