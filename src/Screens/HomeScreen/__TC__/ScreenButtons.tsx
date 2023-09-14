import React, { useMemo } from 'react';

import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import { API } from '../__API__';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  async function createProject() {
    AlertService.handleAlert(true, {
      question: '',
      type: 'project creation',
    }, () => {
      API.ProjectButtons.refresh();
    });
  }

  return (
    <Layout.ScreenButtons
      button_right={
        <Layout.Button.IconRounded
          iconName="folder"
          showPlusSign={true}
          color={theme.onConfirm}
          color_background={theme.confirm}
          onPress={async () => await createProject()}
        />
      }
    />
  );
}
