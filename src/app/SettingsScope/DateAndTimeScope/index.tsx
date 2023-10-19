import React, { memo, useEffect, useMemo, useState } from 'react';

import { Loading } from '@Types/AppTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { DateFormatScreen } from '@Screens/DateFormatScreen';
import { TimeFormatScreen } from '@Screens/TimeFormatScreen';

export default function DateAndTimeScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.dateAndTime[config.language], []);
  const [loading, setLoading] = useState<Loading>('Loading');

  useEffect(() => {
    setLoading('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Date and time']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Carousel

        onBackPress={(() => navigate('SETTINGS SCOPE'))}

        buttonData={[{
          title: '',
          iconName: 'calendar',
        }, {
          title: '',
          iconName: 'time',
        }]}

        screens={[
          <DateFormatScreen
            key="1"
            timeAndDateScopeState={loading}
          />,
          <TimeFormatScreen
            key="2"
            timeAndDateScopeState={loading}
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
          iconName="time"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
