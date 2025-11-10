import React, { useState, memo } from 'react';
import { View, Modal as ReactNative_Modal, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ModalConfig } from '@V2/Types/AppTypes';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { PopUpSelector } from './Selector';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const PopUpLayer = memo(() => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    question: '',
    type: 'warning',
  });

  PopUpAPI.registerAlertShowSetter(setShowModal);
  PopUpAPI.registerAlertModalConfigSetter(setModalConfig);

  return (
    <ReactNative_Modal
      visible={showModal}
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
            <PopUpSelector
              config={modalConfig}
              closeModal={() => setShowModal(false)}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </ReactNative_Modal>
  );
});
