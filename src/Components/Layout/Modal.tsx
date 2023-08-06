import React, { useMemo, ReactNode } from 'react';
import { View, Text, Modal as ReactNative_Modal, Dimensions, StyleProp, ViewStyle } from 'react-native';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import IconButton from './Button/IconButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Modal(props: {
  title: string
  children: ReactNode
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

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
        style={{ height: useSafeAreaInsets().top }}
      />
      <Navbar
        title={props.title}
        style={{
          height: 70,
        }}
        onIconPress={props.onRequestClose}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.secondary,
        }}
      >
        {props.children}
      </View>
    </ReactNative_Modal>
  );
}

function Navbar(props: {
  title: string
  style: StyleProp<ViewStyle>
  onIconPress: () => void | undefined
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
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
        iconName="close"
        onPress={props.onIconPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </View>
  );
}
