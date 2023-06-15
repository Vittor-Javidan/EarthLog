import React, {useState} from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Dimensions,
  Button,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import APPColors from '../Globals/Colors';
import { APP_VERSION } from '../Globals/Version';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function NewLayout(props: {
  title: string,
  children: JSX.Element
  drawerChildren: JSX.Element
}): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <StatusBar hidden={true}/>
    <View
      style={{ flex: 1}}
    >
      <NewLayout_Navbar
        title={props.title}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{flex: 1}}
      />
      <NewLayout_Content
        style={{flex: 8}}
      >
        {props.children}
      </NewLayout_Content>
      <NewLayout_Footer
        style={{flex: 1}}
      />
    </View>
    {showDrawer && (
      <NewLayout_Drawer
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIDTH * 0.8,
          height: HEIGHT,
        }}
      >
        {props.drawerChildren}
      </NewLayout_Drawer>
    )}
  </>);
}

function NewLayout_Navbar(props: {
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
      <Text
        style={{
          color: APPColors.onPrimary,
        }}
      >
        {props.title}
      </Text>
      <Button
        title="Menu"
        onPress={props.onMenuButtonPress}
      />
    </View>
  );
}

function NewLayout_Content(props: {
  style: StyleProp<ViewStyle>
  children: JSX.Element
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

function NewLayout_Footer(props: {
  style: StyleProp<ViewStyle>
}) {
  return (
    <View
      style={[props.style, {
        backgroundColor: APPColors.primary,
      }]}
    >
      <Text
        style={{
          color: APPColors.onPrimary,
        }}
      >
        {APP_VERSION}
      </Text>
    </View>
  );
}

function NewLayout_Drawer(props: {
  style: StyleProp<ViewStyle>
  children: JSX.Element
}): JSX.Element {
  return (
    <ScrollView
      style={[props.style, {
        backgroundColor: APPColors.primary,
      }]}
    >
      {props.children}
    </ScrollView>
  );
}
