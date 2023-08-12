import React, { ReactNode, useState, useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle, Dimensions, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from './Button/IconButton';

import { ThemeDTO } from '@Types/index';

import { APP_VERSION } from '@Globals/Version';
import ConfigService from '@Services/ConfigService';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 70;
const NAVGATION_TREE_HEIGHT = 30;

export default function Root(props: {
  title: string
  children: ReactNode
  drawerChildren: ReactNode
  navigationTree: JSX.Element
  screenButtons: JSX.Element
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const [_, setShowDrawer] = useState<boolean>(false);

  const slideX = useSharedValue(-WIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideX.value }],
    };
  });

  const openDrawer = () => {
    slideX.value = withTiming(0, {duration: 150});
  };

  const closeDrawer = () => {
    slideX.value = withTiming(-WIDTH, {duration: 150});
  };

  return (<>
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
        onMenuButtonPress={() => setShowDrawer(prev => {
          if (prev) {
            closeDrawer();
          } else {
            openDrawer();
          }
          return !prev;
        })}
        style={{ height: NAVBAR_HEIGH }}
      />
      <View
        style={{ flex: 1 }}
      >
        {props.navigationTree}
        <ContentArea
          style={{ flex: 1 }}
        >
          {props.children}
        </ContentArea>
        {props.screenButtons}
      </View>
    </View>
    <Animated.View
      style={animatedStyle}
    >
      <Drawer>
        {props.drawerChildren}
      </Drawer>
    </Animated.View>
  </>);
}

function Navbar(props: {
  title: string
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (<>
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.primary,
      }]}
    >
      <View
        style={{
          flex: 8,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 10,
          padding: 10,
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: theme.onPrimary,
            fontSize: 200,
            fontWeight: '700',
          }}
        >
          {props.title}
        </Text>
      </View>
      <IconButton
        iconName="md-menu-sharp"
        onPress={props.onMenuButtonPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </View>
  </>);
}

function ContentArea(props: {
  style: StyleProp<ViewStyle>
  children: ReactNode
}): JSX.Element {
  return (
    <ScrollView
      style={props.style}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        paddingBottom: 150,
      }}
    >
      {props.children}
    </ScrollView>
  );
}

function Drawer(props: {
  children: ReactNode
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const STATUS_BAR_HEIGHT = useSafeAreaInsets().top;

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: (HEIGHT - STATUS_BAR_HEIGHT - NAVBAR_HEIGH - NAVGATION_TREE_HEIGHT),
        width: '100%',
      }}
    >
      <View
        style={[{
          flex: 9,
          backgroundColor: theme.secondary,
        }]}
      >
        {props.children}
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
      </View>
    </ScrollView>
  );
}
