import React, { memo, useEffect, useMemo, useState } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { DateFormatScreen } from '@V1/Screens/DateFormatScreen';
import { TimeFormatScreen } from '@V1/Screens/TimeFormatScreen';

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
          onBackPress={(() => navigate('RESTART APP'))}
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
          iconName="home-outline"
          onPress={() => navigate('HOME SCOPE')}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="settings-outline"
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
