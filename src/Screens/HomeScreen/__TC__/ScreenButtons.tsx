import React, { useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onProjectCreation: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  async function createProject() {
    AlertService.handleAlert(true, {
      question: '',
      type: 'project creation',
    }, () => {
      props.onProjectCreation();
    });
  }

  return (
    <Layout.ScreenButtons
      buttons={[
        <Button.RoundedIcon
          key="1"
          iconName="folder"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={async () => await createProject()}
          theme={{
            font: theme.onConfirm,
            font_Pressed: theme.onTertiary,
            background: theme.confirm,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}
    />
  );
}
