import React, { ReactNode, useState, useMemo, memo, useCallback } from 'react';
import { View, Pressable, Dimensions, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import DevTools from '@DevTools';
import { SubscriptionManager, useSubscriptionChecker } from '@SubscriptionManager';
import { APP_VERSION } from '@V2/Globals/Version';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';
import { useLayerButtons } from '@V2/Layers/API/LayerButtons';

import { Icon, IconName } from '@V1/Icon/index';
import { Text } from '@V2/Text/index';
import { Animation } from '@V2/Animation/index';

const NAVBAR_HEIGHT = 60;
const NAVIGATION_TREE_HEIGHT = 20

export const Root = memo((props: {
  title: string
  subtitle: string
  showDrawer: boolean
  menuIcon?: IconName
  menuIconStyle?: TextStyle
  navigationTree: React.JSX.Element
  drawerChildren?: React.JSX.Element
  children: ReactNode
  onMenuButtonPress(): void
}) => {

  const { top, bottom } = useSafeAreaInsets();
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.root, []);

  const HEIGHT = Dimensions.get('screen').height - NAVBAR_HEIGHT - top - bottom - NAVIGATION_TREE_HEIGHT
  const menuExist = props.drawerChildren !== undefined;

  useLayerButtons([!props.showDrawer]);

  return (<>
    <Navbar
      title={props.title}
      subtitle={props.subtitle}
      menuIcon={props.menuIcon}
      menuExist={menuExist}
      onMenuButtonPress={props.onMenuButtonPress}
      menuIconStyle={props.menuIconStyle}
    />
    {props.navigationTree}
    <View
      style={{
        height: HEIGHT,
        backgroundColor: theme.background,
      }}
    >
      {props.children}
    </View>
    <Drawer
      show={props.showDrawer}
    >
      {props.drawerChildren}
    </Drawer>
  </>);
});

const Navbar = memo((props: {
  title: string
  subtitle: string
  menuExist: boolean
  menuIcon?: IconName
  menuIconStyle?: TextStyle
  onMenuButtonPress: () => void | undefined
}) => {

  const { top } = useSafeAreaInsets();
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.navbar, []);

  return (<>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingTop: top,
        height: NAVBAR_HEIGHT + top,
      }}
    >
      <View
        style={{
          flex: 8,
          justifyContent: 'center',
          paddingLeft: 15,
        }}
      >
        <Text h1
          style={{
            color: theme.font,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        >
          {props.title}
        </Text>
        {props.subtitle !== '' && (
          <Text p
            style={{
              color: theme.font,
              fontSize: 12,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            {props.subtitle}
          </Text>
        )}
      </View>
      {props.menuExist && (
        <MenuButton
          menuIcon={props.menuIcon}
          onPress={props.onMenuButtonPress}
          menuIconStyle={props.menuIconStyle}
          theme={theme}
        />
      )}
    </View>
  </>);
});

const MenuButton = memo((props: {
  menuIcon?: IconName
  menuIconStyle?: TextStyle
  onPress: () => void
  theme: {
    font: string,
    font_active: string,
    background: string,
    background_active: string,
  }
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
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Icon
          iconName="menu"
          color={pressed ? props.theme.font_active : props.theme.font}
          fontSize={NAVBAR_HEIGHT}
        />
        {props.menuIcon && (
          <Icon
            iconName={props.menuIcon}
            color={pressed ? props.theme.font_active : props.theme.font}
            fontSize={15}
            style={[{
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: pressed ? props.theme.background_active : props.theme.background,
            }, props.menuIconStyle]}
          />
        )}
      </Pressable>
    </View>
  );
});

const Drawer = memo((props: {
  show: boolean
  children: ReactNode
}) => {

  const { top, bottom } = useSafeAreaInsets();
  const { height, width   } =  Dimensions.get('screen')
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawer, []);

  const HEIGHT = height - NAVBAR_HEIGHT - top - bottom - NAVIGATION_TREE_HEIGHT;
  const TOP = top + NAVBAR_HEIGHT + NAVIGATION_TREE_HEIGHT;

  return (<>
    <Animation.Drawer
      show={props.show}
      contentContainerStyle={{ gap: 1 }}
      style={{
        position: 'absolute',
        borderColor: theme.border,
        backgroundColor: theme.background,
        height: HEIGHT,
        width: width,
        top: TOP,
        left: 0,
        borderRightWidth: 2,
        zIndex: 2,
      }}
    >
      {props.children}
      <AppStateChecker />
    </Animation.Drawer>
  </>);
});

const AppStateChecker = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawer, []);

  const [sponsorTier , setSponsorTier ] = useState<number>(SubscriptionManager.getStatus().sponsorship);
  const [isMapEnabled, setIsMapEnabled] = useState<boolean>(SubscriptionManager.getStatus().isMapEnabled);

  let sponsorColor
  switch (sponsorTier) {
    case 1: sponsorColor = theme.wrong; break;   // Supporter
    case 2: sponsorColor = theme.warning; break; // Gold
    case 3: sponsorColor = theme.confirm; break; // Emerald
    default: sponsorColor = theme.wrong; break;  // Supporter
  }

  useSubscriptionChecker({
    onSponsorshipLoaded: (tier) => setSponsorTier(tier),
    onMapStatusLoaded: (isEnabled) => setIsMapEnabled(isEnabled),
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 8,
        gap: 10,
      }}
    >
      <Text p
        style={{
          color: theme.font,
          textAlign: 'right',
          fontSize: 10,
        }}
      >
        {'v: ' + APP_VERSION}
      </Text>
      {sponsorTier > 0 && (
        <Icon
          color={sponsorColor}
          iconName={'heart'}
          fontSize={20}
        />
      )}
      {isMapEnabled && (
        <Icon
          color={theme.wrong}
          iconName={'map'}
          fontSize={20}
        />
      )}
      {DevTools.TUTORIAL_MODE && (
        <Icon
          color={theme.confirm}
          iconName={'menu-book'}
          fontSize={20}
        />
      )}
    </View>
  )
});