import React, { ReactNode, useState } from 'react';
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

import APPColors from '../../Globals/Colors';
import { APP_VERSION } from '../../Globals/Version';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Layout(props: {
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
      <Layout_Navbar
        title={props.title}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{flex: 1}}
      />
      <Layout_InnerContentContainer
        style={{flex: 9}}
      >
        {props.children}
      </Layout_InnerContentContainer>
    </View>
    {showDrawer && (
      <Layout_Drawer
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIDTH * 0.8,
          height: HEIGHT,
        }}
      >
        {props.drawerChildren}
      </Layout_Drawer>
    )}
  </>);
}

function Layout_Navbar(props: {
  title: string
  onMenuButtonPress: ((event: GestureResponderEvent) => void) | undefined
  style: StyleProp<ViewStyle>
}): JSX.Element {
  return (
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: APPColors.primary,
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
            color: APPColors.onPrimary,
            fontSize: 24,
          }}
        >
          {props.title}
        </Text>
        <Text
          adjustsFontSizeToFit={true}
          style={{
            color: APPColors.onPrimary,
            fontSize: 8,
          }}
        >
          {APP_VERSION}
        </Text>
      </View>
      <Layout_Navbar_MenuButton
        onPress={props.onMenuButtonPress}
        style={{
          flex: 2,
        }}
      />
    </View>
  );
}

function Layout_Navbar_MenuButton(props: {
  onPress: ((event: GestureResponderEvent) => void) | undefined
  style:  StyleProp<ViewStyle>,
}) {

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={[props.style, {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? APPColors.onPressColorPrimary : APPColors.primary,
        opacity: pressed ? 0.9 : 1,
      }]}
    >
      <Ionicons
        name="md-menu-sharp"
        adjustsFontSizeToFit={true}
        style={{
          color: APPColors.onPrimary,
          fontSize: 48,
        }}
      />
    </Pressable>
  );
}

function Layout_InnerContentContainer(props: {
  style: StyleProp<ViewStyle>
  children: ReactNode
}): JSX.Element {
  return (
    <View
      style={[props.style, {
        backgroundColor: APPColors.background,
      }]}
    >
      {props.children}
    </View>
  );
}

function Layout_Drawer(props: {
  style: StyleProp<ViewStyle>
  children: ReactNode
}): JSX.Element {
  return (
    <ScrollView
      style={[props.style, {
        backgroundColor: APPColors.secondary,
      }]}
    >
      {props.children}
    </ScrollView>
  );
}
