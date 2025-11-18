import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading, ThemeNames_Widgets } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { MapAPI } from '@V1/Layers/API/Map';

import { Layout } from '@V1/Layout/index';
import { Screen_AppTheme } from './Screen_AppTheme';
import { Screen_WidgetTheme } from './Screen_WidgetTheme';
import { Screen_WidgetThemePreview } from './Screen_WidgetThemePreview';
import { NavigationTree } from './NavigationTree';

export const ThemeScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config                                = useMemo(() => ConfigService.config, []);
  const R                                     = useMemo(() => translations.scope.theme[config.language], []);
  const [state              , setState      ] = useState<Loading>('Loading');
  const [showDrawer         , setShowDrawer ] = useState<boolean>(false);
  const [rootRefresher      , refresh       ] = useState<boolean>(true);
  const [selectedWidgetTheme, setWidgetTheme] = useState<ThemeNames_Widgets>(config.widgetTheme);

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
      key={'Refresher:' + rootRefresher}
      title={R['Themes']}
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
            title: R['App'],
          }, {
            title: R['Widget'],
          }, {
            title: R['Preview'],
          }]}

          screens={[
            <Screen_AppTheme
              key="1"
              onAppThemeChange={() => refresh(prev => !prev)}
              onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
            />,
            <Screen_WidgetTheme
              key="2"
              onWidgetThemeSelect={(themeName) => setWidgetTheme(themeName)}
            />,
            <Screen_WidgetThemePreview
              key="3"
              themeName={selectedWidgetTheme}
            />,
          ]}
        />
      )}
    </Layout.Root>
  );
});
