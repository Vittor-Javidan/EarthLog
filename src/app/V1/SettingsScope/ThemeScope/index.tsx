import React, { useEffect, useMemo, useState } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading, ThemeNames_Widgets } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { AppThemeScreen } from '@V1/Screens/AppThemeScreen';
import { WidgetThemeScreen } from '@V1/Screens/WidgetThemeScreen';
import { WidgetThemePreviewScreen } from '@V1/Screens/WidgetThemePreviewScreen';

import NavigationTree from './NavigationTree';

export default function ThemeScope() {

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
      navigationTree={<NavigationTree />}
      key={'Refresher:' + rootRefresher}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.Carousel
          onBackPress={(() => navigate('SETTINGS SCOPE'))}
          buttonData={[{
            title: R['App'],
          }, {
            title: R['Widget'],
          }, {
            title: R['Preview'],
          }]}

          screens={[
            <AppThemeScreen
              key="1"
              onAppThemeChange={() => refresh(prev => !prev)}
            />,
            <WidgetThemeScreen
              key="2"
              onWidgetThemeSelect={(themeName) => setWidgetTheme(themeName)}
            />,
            <WidgetThemePreviewScreen
              key="3"
              themeName={selectedWidgetTheme}
            />,
          ]}
        />
      )}
    </Layout.Root>
  );
}
