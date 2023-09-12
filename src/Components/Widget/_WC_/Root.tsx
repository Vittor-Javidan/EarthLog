import React, { useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { WidgetAlertMessage } from '@Types/index';

import { Layout } from '@Components/Layout';
import P from '@Components/Layout/Text/P';

export default function Root(props: {
  label: string
  isDataWrong: boolean
  showModal: boolean
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  iconButtons?: JSX.Element
  modal: JSX.Element
  children: ReactNode
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    <View
      style={{
        backgroundColor: theme.tertiary,
        borderRadius: 10,
      }}
    >
      <Label
        label={props.label}
        wrongData={props.isDataWrong}
        statusFeedback={props.statusFeedback}
        iconButtons={props.iconButtons}
      />
      <AlertMessages
        alertMessages={props.alertMessages}
      />
      <ChildrenContainer>
        {props.children}
      </ChildrenContainer>
    </View>
    {props.showModal && props.modal}
  </>);
}

function Label(props: {
  label: string
  wrongData: boolean
  statusFeedback?: JSX.Element
  iconButtons?: JSX.Element
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: props.wrongData ? theme.wrong : theme.secondary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: 40,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        {props.statusFeedback}
        <Layout.Text.P
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: props.wrongData ? theme.onWrong : theme.onSecondary,
          }}
        >
          {props.label}
        </Layout.Text.P>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          height: 40,
        }}
      >
        {props.iconButtons}
      </View>
    </View>
  );
}

function AlertMessages(props: {
  alertMessages: WidgetAlertMessage | undefined
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  if (
    props.alertMessages === undefined           ||
    Object.keys(props.alertMessages).length <= 0
  ) {
    return <></>;
  }

  const Messages = Object.values(props.alertMessages).map(alertMessage => (
    <P
      key={alertMessage}
      style={{
        color: theme.wrong,
      }}
    >
      {alertMessage}
    </P>
  ));

  return (
    <View
      style={{
        marginTop: 15,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
      }}
    >
      {Messages}
    </View>
  );
}

function ChildrenContainer(props: {
  children: ReactNode
}) {
  return (
    <Layout.View
      style={{
        paddingVertical: 5,
        gap: 10,
      }}
    >
      {props.children}
    </Layout.View>
  );
}
