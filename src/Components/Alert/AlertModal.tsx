import React, { useEffect, useMemo, useState } from 'react';
import { View, Modal as ReactNative_Modal, Dimensions } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';
import H3 from '@Components/Layout/Text/H3';
import AlertService from '@Services/AlertService';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

type Vibration = 'warning' | 'success'
type Aptics = {
  onShow: Vibration
  onRefuse: Vibration
  onAccept: Vibration
}

export default function AppRootAlertLayer() {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');

  AlertService.registterAlertShowSetter(setShowModal);
  AlertService.registterQuestionSetter(setQuestion);

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
            paddingHorizontal: 30,
          }}
        >
          <MessageWindow
            question={question}
            onAccept={() => setShowModal(false)}
            onRefuse={() => setShowModal(false)}
          />
        </View>
      </View>
    </ReactNative_Modal>
  ) : <></>);
}

function MessageWindow(props: {
  question: string
  onAccept: () => void
  onRefuse: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [aptics, _setAptics] = useState<Aptics>({
    onShow: 'warning',
    onAccept: 'warning',
    onRefuse: 'success',
  });

  useEffect(() => { vibrate(aptics.onShow); }, []);

  async function onRefuse() {
    await vibrate(aptics.onRefuse);
    props.onRefuse();
  }

  async function onAccept() {
    await vibrate(aptics.onAccept);
    await AlertService.runAcceptCallback();
    props.onAccept();
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 10,
        padding: 10,
        gap: 30,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <H3>
          {props.question}
        </H3>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="checkmark-done-sharp"
          color_background={theme.secondary}
          color={theme.confirm}
          color_onPressed={theme.tertiary}
          onPress={async () => await onAccept()}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
        <Button.Icon
          iconName="close"
          color_background={theme.wrong}
          color={theme.onWrong}
          color_onPressed={theme.tertiary}
          onPress={async () => await onRefuse()}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />

      </View>
  </View>
  );
}

async function vibrate(type: Vibration) {
  switch (type) {
    case 'warning': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    case 'success': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success); break;
  }
}
