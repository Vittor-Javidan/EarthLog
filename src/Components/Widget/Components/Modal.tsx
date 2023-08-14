import { WidgetData } from '@Types/index';
import React, { useState, useMemo, ReactNode } from 'react';
import { Layout } from '@Components/Layout';

import ConfigService from '@Services/ConfigService';

export default function Modal(props: {
  title: string
  widgetData: WidgetData
  children: ReactNode
  onConfirm: () => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  return (
    <Layout.Modal
      title={props.title}
      onRequestClose={props.onRequestClose}
      ScreenButtons={
        <ScreenButtons
          title={props.title}
          widgetData={props.widgetData}
          onConfirm={props.onConfirm}
          onDelete={props.onDelete}
          onRequestClose={props.onRequestClose}
        />
      }
    >
      <Layout.ScrollView
        style={{
          flex: 1,
          paddingTop: 10,
        }}
      >
        {props.children}
      </Layout.ScrollView>
    </Layout.Modal>
  );
}

function ScreenButtons(props: {
  title: string
  widgetData: WidgetData
  onConfirm: () => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules } = props.widgetData;
  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  return (
    <Layout.ScreenButtons

      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={props.onRequestClose}
        />
      }

      button_middle={rules.allowWidgetErase ? (
        <Layout.Button.IconRounded
          iconName="trash-outline"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={() => setShow_DeleteSwap(true)}
        />
      ) : undefined}

      button_right={
        <Layout.Button.IconRounded
          iconName="save"
          showPlusSign={false}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={props.onConfirm}
        />
      }

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Layout.Button.DeleteSwipe
          onSwipe={() => props.onDelete()}
          onCancel={() => setShow_DeleteSwap(false)}
        />
      }
    />
  );
}
