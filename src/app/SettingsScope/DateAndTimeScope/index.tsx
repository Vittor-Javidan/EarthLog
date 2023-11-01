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
  const [state, setState] = useState<Loading>('Loading');

  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Date and time']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
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
            />,
            <TimeFormatScreen
              key="2"
            />,
          ]}
        />
      )}
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
