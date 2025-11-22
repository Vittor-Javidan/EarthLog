import React, { memo } from "react";
import { MarkerAssets } from "@AssetManager";
import { CompassMeasurementDTO, WidgetScope, WidgetTheme } from "@V2/Types/ProjectTypes";
import { Measurement } from "./Measurement";

export const AllMeasurements = memo((props: {
  widgetScope: WidgetScope
  measurements: CompassMeasurementDTO[]
  lockedData: boolean | undefined
  editMode: boolean
  allowMeasurementLabelChange: boolean | undefined
  allowMeasurementDataChange: boolean | undefined
  allowMeasurementDeletion: boolean | undefined
  theme: WidgetTheme
  onMeasurementHeadingChange: (newHeading: number, index: number) => void
  onMeasurementDipChange: (newDip: number, index: number) => void
  onMeasurementMarkerPress: (mapMarker: MarkerAssets, index: number) => void
  onMeasurementMarkerPositionPress: (index: number) => void
  onMeasurementLabelChange: (newLabel: string, index: number) => void
  onMeasurementDelete: (index: number) => void
}) => {
  const AllMeasurementItems = props.measurements.map((measurement, index) => (
    <Measurement
      key={measurement.id}
      widgetScope={props.widgetScope}
      measurement={measurement}
      lockedData={props.lockedData}
      allowMeasurementLabelChange={props.allowMeasurementLabelChange}
      allowMeasurementDataChange={props.allowMeasurementDataChange}
      allowMeasurementDeletion={props.allowMeasurementDeletion}
      editMode={props.editMode}
      theme={props.theme}
      onHeadingChange={(newHeading) => props.onMeasurementHeadingChange(newHeading, index)}
      onDipChange={(newDip) => props.onMeasurementDipChange(newDip, index)}
      onMarkerChange={(mapMarker) => props.onMeasurementMarkerPress(mapMarker, index)}
      onMarkerPositionPress={() => props.onMeasurementMarkerPositionPress(index)}
      onMeasurementLabelChange={(newLabel) => props.onMeasurementLabelChange(newLabel, index)}
      onMeasurementDelete={() => props.onMeasurementDelete(index)}
    />
  ))
  return (<>{AllMeasurementItems}</>)
})