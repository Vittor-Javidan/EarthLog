import React, { useState } from 'react';

import { Layout } from '@Components/Layout';

export default function TestScreen() {

  const [selectScreen, setSelectedScreen] = useState<number>(1);

  return (
    <Layout.Root
      title="Test Screen"
      navigationTree={<NavigationTree />}
      drawerChildren={<></>}
    >
      <Layout.Carousel.Screen
        selected={selectScreen}
        overlayButtons={<>
          <Layout.Carousel.Button
            selected={selectScreen === 1}
            title="Amostras"
            type="left"
            onPress={() => setSelectedScreen(1)}
          />
          <Layout.Carousel.Button
            selected={selectScreen === 2}
            title="Editar projeto"
            type="middle"
            onPress={() => setSelectedScreen(2)}
          />
          <Layout.Carousel.Button
            selected={selectScreen === 3}
            title="Template"
            type="right"
            onPress={() => setSelectedScreen(3)}
          />
        </>}
        screens={[
          <Layout.Screen
            key="1"
            screenButtons={<ScreenButtons />}
          >
            <></>
          </Layout.Screen>,
          <Layout.Screen
            key="2"
            screenButtons={<ScreenButtons />}
          >
            <></>
          </Layout.Screen>,
          <Layout.Screen
            key="3"
            screenButtons={<ScreenButtons />}
          >
            <></>
          </Layout.Screen>,
        ]}
      />
    </Layout.Root>
  );
}

function NavigationTree() {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="1"
          iconName="home"
          onPress={() => {}}
        />,
      ]}
    />
  );
}

function ScreenButtons() {
  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="add-sharp"
          color_background="red"
          showPlusSign={false}
          onPress={() => {}}
        />
      }
      button_middle={
        <Layout.Button.IconRounded
          iconName="add-sharp"
          color_background="blue"
          showPlusSign={false}
          onPress={() => {}}
        />
      }
      button_right={
        <Layout.Button.IconRounded
          iconName="add-sharp"
          color_background="green"
          showPlusSign={false}
          onPress={() => {}}
        />
      }
      showSwipe={false}
      SwipeButton={
        <Layout.Button.DeleteSwipe
          buttonRadius={35}
          onCancel={() => {}}
          onSwipe={() => {}}
        />
      }
    />
  );
}
