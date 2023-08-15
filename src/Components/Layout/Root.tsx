import React, { ReactNode, useState, useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle, Dimensions, ScrollView} from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import IconButton from './Button/IconButton';

import { APP_VERSION } from '@Globals/Version';
import ConfigService from '@Services/ConfigService';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 70;
const NAVIGATION_TREE_HEIGHT = 30;

export default function Root(props: {
  title: string
  children: ReactNode
  drawerChildren: ReactNode
  navigationTree: JSX.Element
  screenButtons: JSX.Element
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

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
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
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
    <Drawer show={showDrawer}>
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
    <View
      style={[props.style]}
    >
      {props.children}
    </View>
  );
}

function Drawer(props: {
  show: boolean
  children: ReactNode
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const SAFE_AREA_HEIGHT = HEIGHT - useSafeAreaInsets().top - useSafeAreaInsets().bottom;

  return (
    <Animation_Drawer show={props.show}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: (SAFE_AREA_HEIGHT - NAVBAR_HEIGH - NAVIGATION_TREE_HEIGHT),
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
