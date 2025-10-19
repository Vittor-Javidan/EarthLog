import React, { memo } from 'react';

import { Layout } from '@V1/Layout/index';
import _Screen1 from './Screen1';
import _Screen2 from './Screen2';
import _Screen3 from './Screen3';
import _Screen4 from './Screen4';

const Screen1 = memo(() => { return <_Screen1 />; });
const Screen2 = memo(() => { return <_Screen2 />; });
const Screen3 = memo(() => { return <_Screen3 />; });
const Screen4 = memo(() => { return <_Screen4 />; });

export default function HomeScope() {
  return (
    <Layout.Root
      title="Test Screen"
      subtitle=""
      drawerChildren={ <></> }
      navigationTree={ <NavigationTree /> }
    >
      <Layout.Carousel
        onBackPress={() => {}}

        buttonData={[{
          title: 'screen_1',
        }, {
          title: 'screen_2',
        }, {
          title: 'screen_3',
        }, {
          title: 'screen_4',
        }]}

        screens={[
          <Screen1 key="1"/>,
          <Screen2 key="2"/>,
          <Screen3 key="3"/>,
          <Screen4 key="4"/>,
        ]}
      />
    </Layout.Root>
  );
}

function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[]}
    />
  );
}
