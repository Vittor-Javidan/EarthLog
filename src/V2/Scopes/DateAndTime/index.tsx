import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { Loading } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { MapAPI } from '@V2/Layers/API/Map';

import { Layout } from '@V2/Layout/index';
import { Screen_DateFormat } from './Screen_DateFormat';
import { Screen_TimeFormat } from './Screen_TimeFormat';
import { NavigationTree } from './NavigationTree';

export const DateAndTimeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.dateAndTime[config.language], []);
  const [state     , setState     ] = useState<Loading>('Loading');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onMenuButtonPress = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);

  const onBackPress = useCallback(() => {
    switch (true) {
      case MapAPI.isMapOpen: MapAPI.toggleMap(); break;
      case showDrawer: setShowDrawer(false); break;
      default: props.onScopeChange({ scope: 'SETTINGS SCOPE' });
    }
  }, [MapAPI.isMapOpen, showDrawer]);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Date and time']}
      subtitle=""
      showDrawer={showDrawer}
      onMenuButtonPress={onMenuButtonPress}
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
          isDrawerOpen={showDrawer}
          onBackPress={onBackPress}
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
