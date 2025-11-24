import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";

import {
  MapFilter
} from "@V1/Types";

import { translations } from "@V1/Translations/index";
import { HapticsService } from "@V1/Services/HapticsService";
import { ConfigService } from "@V1/Services/ConfigService";

import { Icon } from "@V1/Icon/index";
import { Text } from "@V1/Text/index";
import { Button } from "@V1/Button/index";

export const Filter = memo((props: {
  show: boolean,
  filter: MapFilter,
  style?: ViewStyle
  onClose: () => void,
  onFilterChange: (filter: MapFilter) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.layers.map[config.language], [])

  const onFilterChange = useCallback((options: 'projectInfo' | 'sampleInfo' | 'gpsInput' | 'compassMeasurement') => {
    const newFilter = { ...props.filter };
    switch (options) {
      case 'projectInfo':        newFilter.projectInfo        = !newFilter.projectInfo; break;
      case 'sampleInfo':         newFilter.sampleInfo         = !newFilter.sampleInfo; break;
      case 'gpsInput':           newFilter.gpsInput           = !newFilter.gpsInput; break;
      case 'compassMeasurement': newFilter.compassMeasurement = !newFilter.compassMeasurement; break;
    }
    props.onFilterChange(newFilter);
  }, [props.filter, props.onFilterChange]);

  return props.show ? (
    <View
      style={[{
        backgroundColor: '#fff',
        borderRadius: 10,
      }, props.style]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Text h2>{R['Filter']}</Text>
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
          label={R['Project Info']}
          value={props.filter.projectInfo}
          onChange={() => onFilterChange('projectInfo')}
        />
        <FilterOption
          label={R['Sample Info']}
          value={props.filter.sampleInfo}
          onChange={() => onFilterChange('sampleInfo')}
        />
        <FilterOption
          label={R['GPS']}
          value={props.filter.gpsInput}
          onChange={() => onFilterChange('gpsInput')}
        />
        <FilterOption
          label={R['Compass Measurements']}
          value={props.filter.compassMeasurement}
          onChange={() => onFilterChange('compassMeasurement')}
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