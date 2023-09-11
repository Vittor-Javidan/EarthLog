import React, { useMemo, useState } from 'react';

import { GPSWidgetData } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '../../_WC_';

export default function Modal(props: {
  widgetData: GPSWidgetData
  onConfirm: (value: GPSWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.TextWidget[language], []);
  const [widgetData, setWidgetData] = useState<GPSWidgetData>(UtilService.deepCopy(props.widgetData));

  return (
    <WC.Modal
      title={widgetData.name}
      widgetData={props.widgetData}
      onConfirm={() => props.onConfirm(widgetData)}
      onDelete={() => props.onDelete()}
      onRequestClose={() => props.onRequestClose()}
    >
      <Layout.Input.String
        label={R['Widget Name']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        color_placeholder={theme.onBackground_Placeholder}
        placeholder={R['Write widget name here...']}
        value={widgetData.name}
        locked={false}
        onChangeText={(text) => setWidgetData(prev => ({ ...prev, name: text }))}
      />
      <Layout.Input.GPS
        label="GPS"
        gpsData={widgetData.gps}
        backgroundColor={theme.background}
        color={theme.onBackground}
        onPress_Delete={() => setWidgetData(prev => ({ ...prev, gps: {} }))}
        onPress_Save={(newGPSData) => setWidgetData(prev => ({ ...prev, gps: newGPSData}))}
      />
    </WC.Modal>
  );
}
