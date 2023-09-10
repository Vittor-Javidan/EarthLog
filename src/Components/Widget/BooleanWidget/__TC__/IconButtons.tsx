import React, { useMemo } from 'react';

import { BooleanWidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';

export default function IconButtons(props: {
  widgetData: BooleanWidgetData
  showGPS: boolean
  onPencilPress: () => void
  onGPSPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {!props.showGPS && (
      <Layout.Button.Icon
        iconName="location"
        color_background={theme.secondary}
        color={theme.onSecondary}
        onPress={() => props.onGPSPress()}
        style={{
          height: 40,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    )}
    {(props.widgetData.rules.allowLabelChange) && (
      <Layout.Button.Icon
        iconName="pencil-sharp"
        color={theme.onSecondary}
        onPress={() => props.onPencilPress()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderTopRightRadius: 10,
        }}
      />
    )}
  </>);
}
