import React, { useState, memo } from 'react';
import { View, Modal as ReactNative_Modal, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ModalConfig } from '@V1/Types/AppTypes';
import AlertService from '@V1/Services/AlertService';

import { Selector } from './Selector';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const AlertLayer = memo(() => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    question: '',
    type: 'warning',
  });

  AlertService.registerAlertShowSetter(setShowModal);
  AlertService.registerAlertModalConfigSetter(setModalConfig);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              opacity: 0.8,
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
              closeModal={() => setShowModal(false)}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </ReactNative_Modal>
  ) : <></>);
});
