import React, { ReactNode, useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Layout } from '@Components/Layout';

export default function Modal(props: {
  title: string
  children: ReactNode
  onConfirm: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Layout.Modal
      title={props.title}
      onRequestClose={props.onRequestClose}
    >
      <Layout.ScrollView>
        {props.children}
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Save"
          onPress={props.onConfirm}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
        />
      </Layout.View>
    </Layout.Modal>
  );
}
