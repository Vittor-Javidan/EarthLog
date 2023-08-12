import React, { useMemo, ReactNode } from 'react';
import { View, Text, Modal as ReactNative_Modal, Dimensions } from 'react-native';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import IconButton from './Button/IconButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Modal(props: {
  title: string
  color_Navbar?: string
  color_onNavbar?: string
  color_background?: string
  ScreenButtons?: JSX.Element
  children: ReactNode
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const backgroundColor = props.color_background ? props.color_background : theme.background;
  const navbarColor = props.color_Navbar ? props.color_Navbar : theme.primary;

  return (
    <ReactNative_Modal
      onRequestClose={props.onRequestClose}
      animationType="slide"
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      statusBarTranslucent={true}
    >
      <View
        style={{
          height: useSafeAreaInsets().top,
          backgroundColor: navbarColor,
        }}
      />
      <Navbar
        color_Navbar={props.color_Navbar}
        color_onNavbar={props.color_onNavbar}
        title={props.title}
        onIconPress={props.onRequestClose}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
          paddingBottom: 150,
        }}
      >
        {props.children}
      </View>
      {props.ScreenButtons}
    </ReactNative_Modal>
  );
}

function Navbar(props: {
  title: string
  color_Navbar?: string
  color_onNavbar?: string
  onIconPress: () => void | undefined
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const backgroundColor = props.color_Navbar ? props.color_Navbar : theme.primary;
  const fontColor = props.color_onNavbar ? props.color_onNavbar : theme.onPrimary;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        height: 70,
      }}
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
            color: fontColor,
            fontSize: 200,
            fontWeight: '600',
          }}
        >
          {props.title}
        </Text>
      </View>
      <IconButton
        iconName="close"
        onPress={props.onIconPress}
        color={fontColor}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </View>
  );
}
