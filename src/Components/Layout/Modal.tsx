import React, { useMemo, ReactNode } from 'react';
import { View, Text, Modal as ReactNative_Modal, Dimensions } from 'react-native';

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
        onIconPress={props.onRequestClose}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingBottom: 150,
        }}
      >
        {props.children}
      </View>
    </ReactNative_Modal>
  );
}

function Navbar(props: {
  title: string
  onIconPress: () => void | undefined
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.primary,
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
