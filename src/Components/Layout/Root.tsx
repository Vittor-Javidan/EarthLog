import React, { ReactNode, useState, useMemo, useEffect, memo } from 'react';
import { View, StyleProp, ViewStyle, Dimensions, ScrollView, Pressable, Platform } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Vibration from 'expo-haptics';

import { APP_VERSION } from '@Globals/Version';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import FontService from '@Services/FontService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { AlertModal } from '@Alert/index';

const { height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 60;
const NAVIGATION_TREE_HEIGHT = 20;

export default function Root(props: {
  title: string
  children: ReactNode
  drawerChildren: ReactNode
  navigationTree: JSX.Element
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <AlertModal />
    <StatusBar
      animated={true}
      networkActivityIndicatorVisible={true}
      backgroundColor={theme.primary}
    />
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Navbar
        title={props.title}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{ height: NAVBAR_HEIGH }}
      />
      <View
        style={{ flex: 1 }}
      >
        {props.navigationTree}
        <View
          style={{ flex: 1 }}
        >
          {props.children}
        </View>
      </View>
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

function Navbar(props: {
  title: string
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const iosLargeTitle = Platform.OS === 'ios' && props.title.length >= 15;

  return (<>
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.primary,
      }]}
    >
      <View
        style={{
          flex: 8,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: iosLargeTitle ? 5 : 10,
        }}
      >
        <Text.Root
          style={{
            color: theme.onPrimary,
            fontSize: iosLargeTitle ? FontService.FONTS.h1 : 200,
          }}
        >
          {props.title}
        </Text.Root>
      </View>
      <MenuButton
        onPress={props.onMenuButtonPress}
      />
    </View>
  </>);
}

function MenuButton(props: {
  onPress: () => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const [pressed, setPressed] = useState<boolean>(false);

  async function onPressIn() {
    setPressed(true);
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  async function onPress() {
    props.onPress();
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
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
          backgroundColor: pressed ? theme.onPrimary : theme.primary,
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
          color={pressed ? theme.primary : theme.onPrimary}
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
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const SAFE_AREA_HEIGHT = HEIGHT - useSafeAreaInsets().top - useSafeAreaInsets().bottom;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'row',
      }}
      style={{
        backgroundColor: theme.background,
        borderColor: theme.primary,
        position: 'absolute',
        height: (SAFE_AREA_HEIGHT - NAVBAR_HEIGH - NAVIGATION_TREE_HEIGHT),
        width: '100%',
        bottom: 0,
        left: 0,
        borderRightWidth: 2,
      }}
    >
      {props.children}
      <Pressable
        onPress={() => props.onPress_Background()}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Text.Root
          style={{
            color: theme.onBackground,
            textAlign: 'right',
            fontSize: 16,
            padding: 8,
          }}
        >
          {'v: ' + APP_VERSION}
        </Text.Root>
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
