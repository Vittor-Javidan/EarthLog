import React, { memo, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V2/Globals/NavigationControler';
import { Loading, ThemeNames_Widgets } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
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
  const [rootRefresher      , refresh       ] = useState<boolean>(true);
  const [selectedWidgetTheme, setWidgetTheme] = useState<ThemeNames_Widgets>(config.widgetTheme);

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Themes']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />}
      
      key={'Refresher:' + rootRefresher}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={(() => props.onScopeChange({ scope: 'SETTINGS SCOPE' }))}
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
