import React, { ReactNode, useState, useMemo, useCallback } from 'react';
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

type navbarButtonType = 'Menu' | 'GoBack'

export default function Root(props: {
  title: string
  navbarButtonType: navbarButtonType
  showNavigationTree: boolean
  children: ReactNode
  drawerChildren?: ReactNode
  navigationTreeIcons?: JSX.Element[]
  onGoBackPress?: () => void
}): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onNavbarButtonPress = useCallback(() => {
    switch (props.navbarButtonType) {
      case 'Menu': {
        setShowDrawer(prev => !prev);
        break;
      }
      case 'GoBack': {
        if (props.onGoBackPress !== undefined) {
          props.onGoBackPress();
        }
      }
    }
  }, []);

  return (<>
    <StatusBar hidden={true}/>
    <View
      style={{ flex: 1}}
    >
      <Navbar
        title={props.title}
        navbarButtonType={props.navbarButtonType}
        onMenuButtonPress={onNavbarButtonPress}
        style={{flex: 1}}
      />
      <View
        style={{ flex: 9 }}
      >
        {props.showNavigationTree && (
          <NavigationTree
            style={{ flex: 1 }}
            treeElements={props.navigationTreeIcons}
          />
        )}
        <ContentArea
          style={{ flex: 25 }}
        >
          {props.children}
        </ContentArea>
      </View>
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
  navbarButtonType: navbarButtonType
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
        navbarButtonType={props.navbarButtonType}
        onPress={props.onMenuButtonPress}
        style={{
          flex: 2,
        }}
      />
    </View>
  );
}

function MenuButton(props: {
  navbarButtonType: navbarButtonType
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
        name={props.navbarButtonType === 'Menu' ? 'md-menu-sharp' : 'chevron-back-circle-outline' }
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onPrimary,
          fontSize: 48,
        }}
      />
    </Pressable>
  );
}

function NavigationTree(props: {
  treeElements?: JSX.Element[]
  style: StyleProp<ViewStyle>
}) {

  if (props.treeElements === undefined) {
    return <></>;
  }

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const tree: JSX.Element[] = [];
  for (let i = 0; i < props.treeElements.length; i++) {
    tree.push(props.treeElements[i]);
    if ( i !== props.treeElements.length - 1) {
      tree.push(
        <Ionicons
          name="chevron-forward"
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: theme.onPrimary,
            fontSize: 200,
          }}
        />
      );
    }
  }

  return (
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderColor: theme.secondary,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        gap: 5,
      }]}
    >
      {tree}
    </View>
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
