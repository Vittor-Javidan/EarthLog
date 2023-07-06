import React, { ReactNode, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeDTO } from '../../Services/ThemeService';
import ConfigService from '../../Services/ConfigService';

import { APP_VERSION } from '../../Globals/Version';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Root(props: {
  title: string
  children: ReactNode
  drawerChildren: ReactNode
}): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <StatusBar hidden={true}/>
    <View
      style={{ flex: 1}}
    >
      <Navbar
        title={props.title}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{flex: 1}}
      />
      <ContentArea
        style={{flex: 9}}
      >
        {props.children}
      </ContentArea>
    </View>
    {showDrawer && (
      <Drawer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: WIDTH * 0.8,
          height: HEIGHT * 0.9,
        }}
      >
        {props.drawerChildren}
      </Drawer>
    )}
  </>);
}

function Navbar(props: {
  title: string
  onMenuButtonPress: ((event: GestureResponderEvent) => void) | undefined
  style: StyleProp<ViewStyle>
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
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
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 10,
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          style={{
            color: theme.onPrimary,
            fontSize: 48,
            paddingVertical: 16,
          }}
        >
          {props.title}
        </Text>
      </View>
      <MenuButton
        onPress={props.onMenuButtonPress}
        style={{
          flex: 2,
        }}
      />
    </View>
  );
}

function MenuButton(props: {
  onPress: ((event: GestureResponderEvent) => void) | undefined
  style:  StyleProp<ViewStyle>,
}) {

  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={[props.style, {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? theme.onPressColorPrimary : theme.primary,
        opacity: pressed ? 0.9 : 1,
      }]}
    >
      <Ionicons
        name="md-menu-sharp"
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onPrimary,
          fontSize: 48,
        }}
      />
    </Pressable>
  );
}

function ContentArea(props: {
  style: StyleProp<ViewStyle>
  children: ReactNode
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={[props.style, {
        backgroundColor: theme.background,
      }]}
    >
      {props.children}
    </View>
  );
}

function Drawer(props: {
  style: StyleProp<ViewStyle>
  children: ReactNode
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <ScrollView
      style={[props.style, {
        backgroundColor: theme.secondary,
      }]}
    >
      {props.children}
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onPrimary,
          textAlign: 'right',
          fontSize: 16,
          padding: 8,
        }}
      >
        v: {APP_VERSION}
      </Text>
    </ScrollView>
  );
}
