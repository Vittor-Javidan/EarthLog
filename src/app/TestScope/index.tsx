import React, { memo, useState } from 'react';

import { Layout } from '@Layout/index';
import { Screen1 as _Screen1 } from './Screen1';
import { Screen2 as _Screen2 } from './Screen2';
import { Screen3 as _Screen3 } from './Screen3';
import { Screen4 as _Screen4 } from './Screen4';

const Screen1 = memo(() => { return <_Screen1 />; });
const Screen2 = memo(() => { return <_Screen2 />; });
const Screen3 = memo(() => { return <_Screen3 />; });
const Screen4 = memo(() => { return <_Screen4 />; });

export default function HomeScope() {

  const [selectedScreen , setSelectedScreen ] = useState<number>(1);

  return (
    <Layout.Root
      title="Test Screen"
      subtitle=""
      drawerChildren={ <></> }
      navigationTree={ <NavigationTree /> }
    >
      <Layout.Carousel.Screen
        selected={selectedScreen}
        overlayButtons={
          <OverlayButtons
            selectedScreen={selectedScreen}
            onSelect={(screeNumber) => setSelectedScreen(screeNumber)}
          />
        }
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

function OverlayButtons(props: {
  selectedScreen: number
  onSelect: (screenNumber: number) => void
}) {
  return (
    <>
      <Layout.Carousel.Button
        selected={props.selectedScreen === 1}
        title="Screen 1"
        onPress={() => props.onSelect(1)}
        type="left"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 2}
        title="Screen 2"
        onPress={() => props.onSelect(2)}
        type="middle"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 3}
        title="Screen 3"
        onPress={() => props.onSelect(3)}
        type="middle"
      />
      <Layout.Carousel.Button
        selected={props.selectedScreen === 4}
        title="Screen 4"
        onPress={() => props.onSelect(4)}
        type="right"
      />
    </>
  );
}
