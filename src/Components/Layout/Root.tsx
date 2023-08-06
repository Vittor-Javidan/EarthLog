import React, { ReactNode, useState, useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle, Dimensions, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconName } from './Icon';
import IconButton from './Button/IconButton';

import { ThemeDTO } from '@Types/index';

import { APP_VERSION } from '@Globals/Version';
import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

const { height: HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGH = 70;
const NAVIGATION_TREE_HEIGHT = 30;

export default function Root(props: {
  title: string
  iconName: IconName
  showNavigationTree: boolean
  children: ReactNode
  drawerChildren: ReactNode
  navigationTreeIcons?: JSX.Element[]
  button_left?: JSX.Element
  button_middle?: JSX.Element
  button_right?: JSX.Element
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
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
        iconName={props.iconName}
        onMenuButtonPress={() => setShowDrawer(prev => !prev)}
        style={{ height: NAVBAR_HEIGH }}
      />
      <View
        style={{ flex: 1 }}
      >
        {props.showNavigationTree && (
          <NavigationTree
            style={{ height: NAVIGATION_TREE_HEIGHT }}
            treeElements={props.navigationTreeIcons}
          />
        )}
        <ContentArea
          style={{ flex: 1 }}
        >
          {props.children}
        </ContentArea>
        <ButtonsArea
          button_left={props.button_left}
          button_middle={props.button_middle}
          button_right={props.button_right}
        />
      </View>
    </View>
    {showDrawer && (
      <Drawer>
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
            fontSize: ThemeService.FONTS.h1,
            fontWeight: '600',
          }}
        >
          {props.title}
        </Text>
      </View>
      <IconButton
        iconName={props.iconName}
        onPress={props.onMenuButtonPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </View>
  </>);
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
  return (
    <ScrollView
      style={props.style}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        gap: 5,
        paddingTop: 30,
        paddingBottom: 150,
      }}
    >
      {props.children}
    </ScrollView>
  );
}

function ButtonsArea(props: {
  button_left?: JSX.Element
  button_middle?: JSX.Element
  button_right?: JSX.Element
}) {

  const HORIZONTAL_PADDING = 10;

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: HORIZONTAL_PADDING,
        }}
      >
        {props.button_left}
      </View>
      <View
        style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.button_middle}
      </View>
      <View
        style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: HORIZONTAL_PADDING,
        }}
      >
        {props.button_right}
      </View>
    </View>
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
        height: (HEIGHT - STATUS_BAR_HEIGHT - NAVBAR_HEIGH),
        width: '100%',
      }}
    >
      <View
        style={{
          flex: 9,
          backgroundColor: theme.secondary,
        }}
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
