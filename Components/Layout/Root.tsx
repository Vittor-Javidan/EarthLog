import React, { ReactNode, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

import ThemeService, { ThemeDTO } from '../../Services/ThemeService';
import ConfigService from '../../Services/ConfigService';

import { APP_VERSION } from '../../Globals/Version';
import { Icon, IconName } from './Icon';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

// type navbarButtonType = 'Menu' | 'GoBack'

export default function Root(props: {
  title: string
  iconName: IconName
  showNavigationTree: boolean
  children: ReactNode
  drawerChildren: ReactNode
  navigationTreeIcons?: JSX.Element[]
}): JSX.Element {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (<>
    <View
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      <StatusBar animated={true} />
      <Navbar
        title={props.title}
        iconName={props.iconName}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{
          width: WIDTH,
          height: HEIGHT * 0.12,
        }}
      />
      <View
        style={{
          width: WIDTH,
          height: HEIGHT * 0.88,
        }}
      >
        {props.showNavigationTree && (
          <NavigationTree
            style={{ flex: 1 }}
            treeElements={props.navigationTreeIcons}
          />
        )}
        <ContentArea
          style={{ flex: 19 }}
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
          width: WIDTH,
          height: (HEIGHT * 0.88),
        }}
      >
        {props.drawerChildren}
      </Drawer>
    )}
  </>);
}

function Navbar(props: {
  title: string
  iconName: IconName
  style: StyleProp<ViewStyle>
  onMenuButtonPress: () => void | undefined
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={[props.style, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.primary,
        paddingTop: 20,
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
            fontSize: ThemeService.FONTS.h1,
            fontWeight: '600',
          }}
        >
          {props.title}
        </Text>
      </View>
      <Icon.Root
        iconName={props.iconName}
        onPress={props.onMenuButtonPress}
        paddingHorizontal={10}
        paddingVertical={10}
      />
    </View>
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
          key={`treeIcon_Chevrn_${i + 1}`}
          name="chevron-forward"
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: theme.onPrimary,
            fontSize: ThemeService.FONTS.auto,
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
