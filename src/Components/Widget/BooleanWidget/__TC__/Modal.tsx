import React, { useMemo, useState } from 'react';

import { BooleanWidgetData } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '@Components/Widget/_WC_';

export default function Modal(props: {
  widgetData: BooleanWidgetData
  onConfirm: (value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.BooleanWidget[language], []);
  const { rules } = props.widgetData;
  const [widgetData, setWidgetData] = useState<BooleanWidgetData>(UtilService.deepCopy(props.widgetData));

  function deleteGPS() {
    if (widgetData.gps !== undefined) {
      setWidgetData(prev => {
        delete prev.gps;
        return { ...prev };
      });
    }
  }

  return (
    <WC.Modal
      title={widgetData.name}
      widgetData={props.widgetData}
      onConfirm={() => props.onConfirm(widgetData)}
      onDelete={() => props.onDelete()}
      onRequestClose={() => props.onRequestClose()}

      utilityButtons={
        <UtilityButtons
          showGPSButton={widgetData.gps === undefined}
          onPress_GPSButton={() => setWidgetData(prev => ({ ...prev, gps: {} }))}
        />
      }
    >
      <Layout.Input.String
        label={R['Widget name']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        color_placeholder={theme.onBackground_Placeholder}
        placeholder={R['Write widget name here...']}
        value={widgetData.name}
        locked={!rules.allowLabelChange}
        onChangeText={(text) => setWidgetData(prev => ({ ...prev, name: text }))}
      />
      <Layout.Input.Boolean
        label={R['Value']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        value={widgetData.value}
        notApplicable={widgetData.notApplicable}
        locked={!rules.allowValueChange}
        onSwitchChange={(boolean) => setWidgetData(prev => ({ ...prev, value: boolean }))}
        onNotApplicableChange={(boolean) => setWidgetData(prev => ({ ...prev, notApplicable: boolean }))}
      />
      {widgetData.gps !== undefined && (
        <Layout.Input.GPS
          label="GPS"
          gpsData={widgetData.gps}
          backgroundColor={theme.background}
          color={theme.onBackground}
          onPress_Delete={() => deleteGPS()}
          onPress_Save={(newGPSData) => setWidgetData(prev => ({ ...prev, gps: newGPSData }))}
        />
      )}
    </WC.Modal>
  );
}

function UtilityButtons(props: {
  showGPSButton: boolean
  onPress_GPSButton: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {props.showGPSButton && (
      <Layout.Button.Icon
        iconName="location"
        color_background={theme.secondary}
        color={theme.onSecondary}
        onPress={() => props.onPress_GPSButton()}
        style={{
          borderRadius: 10,
          height: 40,
          width: 80,
        }}
      />
    )}
  </>);
}
