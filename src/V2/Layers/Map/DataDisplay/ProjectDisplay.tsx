import { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Constants from "expo-constants";
;
import { ProjectDTO } from "@V2/Types/ProjectTypes";
import { ConfigService } from "@V2/Services/ConfigService";
import { ThemeService } from "@V2/Services_Core/ThemeService";
import { MarkerData, ProjectMapScope } from "@V2/Layers/API/Map";

import { Text } from "@V2/Text/index";
import { MapService } from "@V2/Services/MapService";

export const MapScope_Project = memo((props: {
  scope: ProjectMapScope
  showMap: boolean
  projectDTO: ProjectDTO
  initialSampleFilter: Record<string, boolean>
  onMarkerUpdated: (markerData: MarkerData[]) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [sampleFilter, setSampleFilter] = useState<Record<string, boolean>>(props.initialSampleFilter);

  useEffect(() => {
    props.onMarkerUpdated(MapService.getGPSMarkerData_Project(props.projectDTO, sampleFilter));
  }, [sampleFilter])

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
        {'Looking into project: '}
      </Text>
      <Text p
        style={{color: theme.font}}
      >
        {props.projectDTO.projectSettings.name}
      </Text>
    </View>
  );
});