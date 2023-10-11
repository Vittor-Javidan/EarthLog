import React, { memo, useEffect, useMemo, useState } from 'react';

import { translations } from '@Translations/index';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';

import { Loading, ThemeNames_Widgets } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { AppThemeScreen } from '@Screens/AppThemeScreen';
import { WidgetThemeScreen } from '@Screens/WidgetThemeScreen';
import { WidgetThemePreviewScreen } from '@Screens/WidgetThemePreviewScreen';

export default function ThemeScope(): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.themeScope[config.language], []);

  const [loading            , setLoading    ] = useState<Loading>('Loading');
  const [rootRefresher      , refresh       ] = useState<boolean>(true);
  const [selectedWidgetTheme, setWidgetTheme] = useState<ThemeNames_Widgets>(config.widgetTheme);

  useEffect(() => {
    setLoading('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Themes']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      key={'Refresher:' + rootRefresher}
    >
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
            themeScopeState={loading}
            onAppThemeChange={() => refresh(prev => !prev)}
          />,
          <WidgetThemeScreen
            key="2"
            themeScopeState={loading}
            onWidgetThemeSelect={(themeName) => setWidgetTheme(themeName)}
          />,
          <WidgetThemePreviewScreen
            key="3"
            themeScopeState={loading}
            widgetThemeName={selectedWidgetTheme}
          />,
        ]}
      />
    </Layout.Root>
  );
}

const NavigationTree = memo(() => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings"
          onPress={() => navigate('SETTINGS SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="color-palette"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
