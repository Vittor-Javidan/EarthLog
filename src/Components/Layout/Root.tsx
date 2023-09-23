import React, { ReactNode, useState, useMemo, useEffect, memo } from 'react';
import { View, StyleProp, ViewStyle, Dimensions, ScrollView, Pressable } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_VERSION } from '@Globals/Version';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import ApticsService from '@Services/ApticsService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { AlertModal } from '@Alert/index';

const { height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 60;
const NAVIGATION_TREE_HEIGHT = 20;

export default function Root(props: {
  title: string
  subtitle: string
  children: ReactNode
  drawerChildren: ReactNode
  navigationTree: JSX.Element
}): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <AlertModal />
    <AppStatusBar />
    <Navbar
      title={props.title}
      subtitle={props.subtitle}
      onMenuButtonPress={() => setShowDrawer(prev => !prev)}
      style={{ height: NAVBAR_HEIGH }}
    />
    {props.navigationTree}
    <View
      style={{ flex: 1 }}
    >
      {props.children}
    </View>
    <DrawerAnimation show={showDrawer}>
      <Drawer
        onPress_Background={() => setShowDrawer(false)}
      >
        {props.drawerChildren}
      </Drawer>
    </DrawerAnimation>
  </>);
}

function AppStatusBar() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.statusBar, []);

  return (
    <StatusBar
      animated={true}
      networkActivityIndicatorVisible={true}
      backgroundColor={theme.background}
    />
  );
}

function Navbar(props: {
  title: string
  subtitle: string
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.navbar, []);

  return (<>
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
      }]}
    >
      <View
        style={{
          flex: 8,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text h1
          style={{ color: theme.font }}
        >
          {props.title}
        </Text>
        {props.subtitle !== '' && (
          <Text p
            style={{ color: theme.font }}
          >
            {props.subtitle}
          </Text>
        )}
      </View>
      <MenuButton
        onPress={props.onMenuButtonPress}
        theme={theme}
      />
    </View>
  </>);
}

function MenuButton(props: {
  theme: {
    font: string,
    font_active: string,
    background: string,
    background_active: string,
  }
  onPress: () => void
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);

  async function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  async function onPress() {
    props.onPress();
    ApticsService.vibrate('success');
  }

  return (
    <View
      style={{
        paddingHorizontal: 1,
        paddingVertical: 1,
      }}
    >
      <Pressable
        onPressIn={async () => await onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          flexDirection: 'row',
          backgroundColor: pressed ? props.theme.background_active : props.theme.background,
          paddingHorizontal: 10,
          paddingVertical: 0,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Icon
          iconName="md-menu-sharp"
          color={pressed ? props.theme.font_active : props.theme.font}
        />
      </Pressable>
    </View>
  );
}

const Drawer = memo((props: {
  children: ReactNode
  onPress_Background: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawer, []);
  const SAFE_AREA_HEIGHT = HEIGHT - useSafeAreaInsets().top - useSafeAreaInsets().bottom;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      style={{
        position: 'absolute',
        borderColor: theme.border,
        height: (SAFE_AREA_HEIGHT - NAVBAR_HEIGH - NAVIGATION_TREE_HEIGHT),
        width: '100%',
        bottom: 0,
        left: 0,
        borderRightWidth: 2,
        zIndex: 2,
      }}
    >
      {props.children}
      <Pressable
        onPress={() => props.onPress_Background()}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: theme.background,
        }}
      >
        <Text
          style={{
            color: theme.font,
            textAlign: 'right',
            fontSize: 16,
            padding: 8,
          }}
        >
          {'v: ' + APP_VERSION}
        </Text>
      </Pressable>
    </ScrollView>
  );
});

function DrawerAnimation(props: {
  show: boolean
  children: ReactNode
}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);
  const leftOffset = useSharedValue(-width);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      leftOffset.value = withTiming(props.show ? 0 : -width, {
        duration: 200,
      });
    });
    return () => { cancelAnimationFrame(animationFrameId); };
  }, [props.show]);

  return (
    <Animated.View
      style={[
        useAnimatedStyle(() => ({
          transform: [{ translateX: leftOffset.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.View>
  );
}
