import { memo, useCallback, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";

import { Z_INDEX } from "@V1/Globals/zIndex";
import { MapMarkerFilter } from "@V1/Types/AppTypes";
import { HapticsService } from "@V1/Services/HapticsService";

import { Icon } from "@V1/Icon/index";
import { Button } from "@V1/Button/index";
import { Text } from "@V1/Text/index";

export const MarkerFilter = memo((props: {
  show: boolean,
  filter: MapMarkerFilter,
  onClose: () => void,
  onFilterChange_marker_projectInfo: (newValue: boolean) => void,
  onFilterChange_markers_sampleInfo: (newValue: boolean) => void,
  onFilterChange_markers_gpsInput: (newValue: boolean) => void,
  onFilterChange_markers_compassMeasurement: (newValue: boolean) => void,
}) => {

  return props.show ? (
    <View
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Text h2>{'Filter'}</Text>
        <CloseButton
          onPress={props.onClose}
        />
      </View>
      <View
        style={{
          borderRadius: 10,
          gap: 10,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
      >
        <FilterOption
          label="Project Info Markers"
          value={props.filter.projectInfo}
          onChange={props.onFilterChange_marker_projectInfo}
        />
        <FilterOption
          label="Sample Info Markers"
          value={props.filter.sampleInfo}
          onChange={props.onFilterChange_markers_sampleInfo}
        />
        <FilterOption
          label="GPS Input Markers"
          value={props.filter.gpsInput}
          onChange={props.onFilterChange_markers_gpsInput}
        />
        <FilterOption
          label="Compass Measurement Markers"
          value={props.filter.compassMeasurement}
          onChange={props.onFilterChange_markers_compassMeasurement}
        />
      </View>
    </View>
  ) : <></>
})

const FilterOption = memo((props: {
  label: string,
  value: boolean,
  onChange: (newValue: boolean) => void,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Button.Checkbox
        value={props.value}
        onChange={props.onChange}
        theme={{
          background: '#666',
          font: '#222',
          confirm: '#5F5',
        }}
      />
      <Text>
        {props.label}
      </Text>
    </View>
  )
})

export const CloseButton = memo((props: {
  onPress: () => void
  style?: ViewStyle
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={[{
        borderRadius: 10,
        padding: 5,
      }, props.style]}
    >
      <Icon
        iconName={'close'}
        color={pressed ? '#f00' : '#000'}
        fontSize={40}
      />
    </Pressable>
  );
});