import React, { useMemo, useState } from 'react';
import { View, Modal as ReactNative_Modal, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AlertModalConfig } from '@Types/AppTypes';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';

import Selector from './Selector';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export function AlertModal() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<AlertModalConfig>({
    question: '',
    type: 'warning',
  });

  AlertService.registterAlertShowSetter(setShowModal);
  AlertService.registterAlertModalConfigSetter(setModalConfig);

  return (showModal ? (
    <ReactNative_Modal
      animationType="fade"
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      statusBarTranslucent={true}
      transparent
    >
      <GestureHandlerRootView style={{ flex: 1}}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.background,
              opacity: 0.6,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: WIDTH,
              height: HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
            }}
          >
            <Selector
              config={modalConfig}
              onAccept={() => setShowModal(false)}
              onRefuse={() => setShowModal(false)}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </ReactNative_Modal>
  ) : <></>);
}
