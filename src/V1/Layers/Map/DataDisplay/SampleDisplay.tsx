import React, { memo, useEffect, useMemo } from "react"
import { View } from "react-native"
import Constants from "expo-constants"

import { MarkerData, SampleMapScope } from "@V1/Types/AppTypes"
import { SampleDTO } from "@V1/Types/ProjectTypes"
import { ConfigService } from "@V1/Services/ConfigService"
import { ThemeService } from "@V1/Services_Core/ThemeService"
import { MapService } from "@V1/Services/MapService"

import { Text } from "@V1/Text/index"

export const MapScope_Sample = memo((props: {
  scope: SampleMapScope
  showMap: boolean
  sampleDTO: SampleDTO
  onMarkerUpdated: (markerData: MarkerData[]) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  useEffect(() => {
    props.onMarkerUpdated(MapService.getGPSMarkerData_Sample(props.sampleDTO))
  }, [props.sampleDTO]);

  return (
    <View
      style={{
        position: 'absolute',
        top: Constants.statusBarHeight + 10,
        right: 10,
        zIndex: 21,
        backgroundColor: theme.background,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text p
        style={{color: theme.font}}
      >
        {'Looking into sample: '}
      </Text>
      <Text p
        style={{color: theme.font}}
      >
        {props.sampleDTO.sampleSettings.name}
      </Text>
    </View>
  )
})