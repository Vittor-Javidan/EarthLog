import React, { useMemo } from 'react';

import { GPSWidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';

export default function IconButtons(props: {
  widgetData: GPSWidgetData
  onPencilPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    <Layout.Button.Icon
      iconName="pencil-sharp"
      color={theme.onSecondary}
      onPress={props.onPencilPress}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 10,
      }}
    />
  </>);
}
