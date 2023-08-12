import React, { useMemo, ReactNode } from 'react';
import {View} from 'react-native';
import { Layout } from '@Components/Layout';

import ConfigService from '@Services/ConfigService';

export default function Root(props: {
  label: string
  isDataWrong: boolean
  showModal: boolean
  iconButtons_Top?: JSX.Element
  iconButtons_BottomLeft?: JSX.Element
  iconButtons_BottomRight?: JSX.Element
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
        iconButtons={props.iconButtons_Top}
      />
      {props.children}
      <Footer
        left={props.iconButtons_BottomLeft}
        right={props.iconButtons_BottomRight}
      />
    </View>
    {props.showModal && props.modal}
  </>);
}

function Label(props: {
  label: string
  wrongData: boolean
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
        borderColor: theme.tertiary,
        borderWidth: 1,
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Layout.Text.Root
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 200,
            color: props.wrongData ? theme.onWrong : theme.onSecondary,
          }}
        >
          {props.label}
        </Layout.Text.Root>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.iconButtons}
      </View>
    </View>
  );
}

function Footer(props: {
  left?: JSX.Element
  right?: JSX.Element
}) {

  if (props.left === undefined && props.right === undefined) {
    return <></>;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {props.left}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {props.right}
      </View>
    </View>
  );
}
