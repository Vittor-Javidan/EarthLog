import React, { memo, useMemo } from 'react';

import { ProjectRules } from '@V1/Types/ProjectTypes';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';

export const ScreenButtons = memo((props: {
  onCreateWidget: () => void
  projectRules: ProjectRules
}) => {

  const { projectRules } = props
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        {projectRules.showCreateWidgetButton_Template && (
          <Button.RoundedIcon
            iconName="square"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCreateWidget}
            theme={{
              font:              theme.font,
              font_active:       theme.confirm,
              background:        theme.confirm,
              background_active: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
