import React, { ReactNode, useState, useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle, Dimensions, ScrollView, Pressable, Platform } from 'react-native';
import { MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Vibration from 'expo-haptics';

import { APP_VERSION } from '@Globals/Version';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import RootText from './Text/Root';
import AppRootAlertLayer from '@Components/Alert/AlertModal';
import { Icon } from './Icon';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 60;
const NAVIGATION_TREE_HEIGHT = 20;

export default function Root(props: {
  title: string
  children: ReactNode
  drawerChildren: ReactNode
  navigationTree: JSX.Element
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <AppRootAlertLayer />
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
    <Drawer
      show={showDrawer}
      onPress_Background={() => setShowDrawer(false)}
    >
      {props.drawerChildren}
    </Drawer>
  </>);
}

function Navbar(props: {
  title: string
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
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
        <RootText
          style={{
            color: theme.onPrimary,
            fontSize: iosLargeTitle ? ThemeService.FONTS.h1 : 200,
          }}
        >
          {props.title}
        </RootText>
      </View>
      <IconButton
        onPress={props.onMenuButtonPress}
      />
    </View>
  </>);
}

function IconButton(props: {
  onPress: () => void
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
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
          backgroundColor: pressed ? theme.tertiary : theme.primary,
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
          color={pressed ? theme.onTertiary : theme.onPrimary}
        />
      </Pressable>
    </View>
  );
}

function Drawer(props: {
  show: boolean
  children: ReactNode
  onPress_Background: () => void
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const SAFE_AREA_HEIGHT = HEIGHT - useSafeAreaInsets().top - useSafeAreaInsets().bottom;

  return (
    <Animation_Drawer show={props.show}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          gap: 1,
        }}
        style={{
          backgroundColor: theme.secondary,
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: (SAFE_AREA_HEIGHT - NAVBAR_HEIGH - NAVIGATION_TREE_HEIGHT),
          width: '100%',
          paddingRight: 1,
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
          <Text
            adjustsFontSizeToFit={true}
            style={{
              color: theme.onSecondary_PlaceHolder,
              textAlign: 'right',
              fontSize: 16,
              padding: 8,
            }}
          >
            v: {APP_VERSION}
          </Text>
        </Pressable>
      </ScrollView>
    </Animation_Drawer>
  );
}

function Animation_Drawer(props: {
  show: boolean
  children: ReactNode
}) {
  return (
    <MotiView
      transition={{
        type: 'timing',
        duration: 200,
      }}
      animate={{
        transform: [{ translateX: props.show ? 0 : -WIDTH }],
      }}
    >
      {props.children}
    </MotiView>
  );
}
