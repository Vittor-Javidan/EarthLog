import React, { memo, useMemo } from 'react';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';

export const ErrorDisplay = memo((props: {
  showDisplay: boolean
  error: string | null
}) => {

  const config     = useMemo(() => ConfigService.config, []);
  const R          = useMemo(() => translations.component.alert.uploadProject[config.language], []);

  return props.showDisplay ? (<>
    <Text h3
      style={{
        paddingHorizontal: 10,
        alignSelf: 'center',
      }}
    >
      {R['Error']}
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
