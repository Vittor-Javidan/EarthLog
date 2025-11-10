import React, { memo, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_DateFormat } from './Screen_DateFormat';
import { Screen_TimeFormat } from './Screen_TimeFormat';
import { NavigationTree } from './NavigationTree';

export const DateAndTimeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.dateAndTime[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Date and time']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={(() => props.onScopeChange({ scope: 'HOME SCOPE' }))}
          buttonData={[{
            title: '',
            iconName: 'calendar',
          }, {
            title: '',
            iconName: 'time',
          }]}

          screens={[
            <Screen_DateFormat
              onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
              key="1"
            />,
            <Screen_TimeFormat
              onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
              key="2"
            />,
          ]}
        />
      )}
    </Layout.Root>
  );
});
