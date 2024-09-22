import React, { ReactNode, useState, useMemo, memo, useCallback } from 'react';
import { View, StyleProp, ViewStyle, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { APP_VERSION } from '@V2/Globals/Version';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';
import { Animation } from '@V2/Animation/index';
import { AlertLayer } from '@V2/Alert/index';
import { CameraLayer } from '@V2/Camera/index';

const NAVBAR_HEIGH = 60;

export const Root = memo((props: {
  title: string
  subtitle: string
  children: ReactNode
  drawerChildren: JSX.Element
  navigationTree: JSX.Element
}) => {
  return (<>
    <StatusBarLayer />
    <AlertLayer />
    <CameraLayer />
    <AppLayer
      title={props.title}
      subtitle={props.subtitle}
      navigationTree={props.navigationTree}
      drawerChildren={props.drawerChildren}
    >
      {props.children}
    </AppLayer>
  </>);
});

const AppLayer = memo((props: {
  title: string
  subtitle: string
  navigationTree: JSX.Element
  drawerChildren: JSX.Element
  children: ReactNode
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.root, []);
  const [drawerDimensions, setDrawerDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [showDrawer      , setShowDrawer      ] = useState<boolean>(false);

  return (<>
    <Navbar
      title={props.title}
      subtitle={props.subtitle}
      onMenuButtonPress={() => setShowDrawer(prev => !prev)}
      style={{ height: NAVBAR_HEIGH }}
    />
    {props.navigationTree}
    <View
      onLayout={(event) => setDrawerDimensions(event.nativeEvent.layout)}
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {props.children}
    </View>
    <Drawer
      show={showDrawer}
      dimensions={drawerDimensions}
      onPress_Background={() => setShowDrawer(false)}
    >
      {props.drawerChildren}
    </Drawer>
  </>);
});

const StatusBarLayer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.statusBar, []);

  return (
    <StatusBar
      animated={true}
      networkActivityIndicatorVisible={true}
      backgroundColor={theme.background}
    />
  );
});

const Navbar = memo((props: {
  title: string
  subtitle: string
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}) => {

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
        style={{ flex: 8 }}
      >
        <View
          style={{
            flex: 6,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}
        >
          <Text h1
            style={{
              color: theme.font,
            }}
          >
            {props.title}
          </Text>
        </View>
        {props.subtitle !== '' && (
          <View
            style={{
              flex: 4,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}
          >
              <Text p
                style={{
                  color: theme.font,
                  fontSize: 12,
                }}
              >
                {props.subtitle}
              </Text>
          </View>
        )}
      </View>
      <MenuButton
        onPress={props.onMenuButtonPress}
        theme={theme}
      />
    </View>
  </>);
});

const MenuButton = memo((props: {
  theme: {
    font: string,
    font_active: string,
    background: string,
    background_active: string,
  }
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  return (
    <View
      style={{
        paddingHorizontal: 1,
        paddingVertical: 1,
      }}
    >
      <Pressable
        onPressIn={() => onPressIn()}
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
          iconName="menu-sharp"
          color={pressed ? props.theme.font_active : props.theme.font}
        />
      </Pressable>
    </View>
  );
});

const Drawer = memo((props: {
  show: boolean
  dimensions: { width: number; height: number }
  children: ReactNode
  onPress_Background: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawer, []);

  const showDrawer = props.dimensions.height > 0 && props.dimensions.width > 0;

  return showDrawer ? (
    <Animation.Drawer
      show={props.show}
      contentContainerStyle={{ gap: 1 }}
      style={{
        position: 'absolute',
        borderColor: theme.border,
        backgroundColor: theme.background,
        height: props.dimensions.height,
        width: props.dimensions.width,
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
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: theme.background,
        }}
      >
        <Text p
          style={{
            color: theme.font,
            textAlign: 'right',
            fontSize: 10,
            padding: 8,
          }}
        >
          {'v: ' + APP_VERSION}
        </Text>
      </Pressable>
    </Animation.Drawer>
  ) : <></>;
});
