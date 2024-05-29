import React, { ReactNode, useState, useMemo, useEffect, memo, useCallback } from 'react';
import { View, StyleProp, ViewStyle, Dimensions, Pressable } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import SubscriptionManager from '@SubscriptionManager';

import { APP_VERSION } from '@V1/Globals/Version';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';
import { AlertLayer } from '@V1/Alert/index';
import { CameraLayer } from '@V1/Camera/index';

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
  const R      = useMemo(() => translations.component.layout.root[config.language], []);

  const showDrawer = props.dimensions.height > 0 && props.dimensions.width > 0;
  const isFreePlan = SubscriptionManager.getPlan() === 'Free';

  return showDrawer ? (
    <DrawerAnimation
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
          flexDirection: isFreePlan ? undefined : 'row',
          justifyContent: isFreePlan ? 'flex-end' : 'space-between',
          alignItems: isFreePlan ? undefined : 'flex-end',
          backgroundColor: theme.background,
        }}
      >
        <Text p
          style={{
            flex: 1,
            color: theme.font,
            textAlign: 'justify',
            fontSize: 10,
            padding: 8,
          }}
        >
          {isFreePlan
            ? R['Free Premium befenefits for you until we hit 1000 users! If you wish to support the app development financially, you can still buy the premium plan.']
            : R['Premium plan']
          }
        </Text>
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
    </DrawerAnimation>
  ) : <></>;
});

const DrawerAnimation = (props: {
  show: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}) => {

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
    <Animated.ScrollView
      contentContainerStyle={[props.contentContainerStyle]}
      style={[
        props.style,
        useAnimatedStyle(() => ({
          transform: [{ translateX: leftOffset.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.ScrollView>
  );
};
