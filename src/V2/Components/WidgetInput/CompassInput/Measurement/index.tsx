import React, { memo, useCallback, useState } from "react";
import { View } from "react-native";

import { MarkerAssets } from "@AssetManager";
import { CompassMeasurementDTO, WidgetScope, WidgetTheme } from "@V2/Types/ProjectTypes";

import { Button } from "@V2/Button/index";
import { MarkerButton } from "./MarkerButton";
import { ItemLabel } from "./ItemLabel";
import { Input_Measurement } from "./Input_Measurement";
import { SetMapMarkerPositionButton } from "./SetMapMarkerPositionButton";

export const Measurement = memo((props: {
  widgetScope: WidgetScope
  measurement: CompassMeasurementDTO
  lockedData: boolean | undefined
  allowMeasurementLabelChange: boolean | undefined
  allowMeasurementDataChange: boolean | undefined
  allowMeasurementDeletion: boolean | undefined
  editMode: boolean
  theme: WidgetTheme
  onHeadingChange: (newHeading: number) => void
  onDipChange: (newDip: number) => void
  onMarkerChange: (mapMarker: MarkerAssets) => void
  onMeasurementLabelChange: (newLabel: string) => void
  onMeasurementDelete: () => void
  onMarkerPositionPress: () => void
}) => {

  const {
    dip,
    heading,
    markerIcon,
    label,
    coordinates
  } = props.measurement;

  const [imageHeading ,setImageHeading] = useState<number>(heading);

  const onHeadingChange = useCallback((heading: number) => {
    props.onHeadingChange(heading);
    setImageHeading(heading);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      }}
    >
      {(
        props.editMode &&
        props.allowMeasurementDeletion &&
        !props.lockedData
      ) ? (
        <Button.Icon
          iconName="trash-outline"
          iconSize={40}
          onPress={() => props.onMeasurementDelete()}
          theme={{
            font:              props.theme.wrong,
            font_active:       props.theme.background,
            background:        props.theme.background,
            background_active: props.theme.wrong,
          }}
          style={{
            height: 60,
            width: 60,
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }}
        />
      ) : (
        <MarkerButton
          markerIcon={markerIcon}
          imageHeading={imageHeading}
          lockedData={props.lockedData}
          onMarkerChange={props.onMarkerChange}
          theme={props.theme}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <ItemLabel
          label={label}
          lockedData={props.lockedData}
          allowMeasurementLabelChange={props.allowMeasurementLabelChange}
          onLabelChange={props.onMeasurementLabelChange}
          theme={props.theme}
        />
        <Input_Measurement
          lockedData={props.lockedData}
          allowMeasurementDataChange={props.allowMeasurementDataChange}
          heading={String(heading)}
          dip={String(dip)}
          onHeadingChange={onHeadingChange}
          onDipChange={props.onDipChange}
          theme={props.theme}
        />
      </View>
      <SetMapMarkerPositionButton
        show={props.widgetScope.type !== 'template'}
        isPinned={coordinates !== undefined}
        onPress={props.onMarkerPositionPress}
        theme={props.theme}
      />
    </View>
  )
});
