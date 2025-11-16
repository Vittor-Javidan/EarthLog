import React, { memo, useCallback, useMemo, useState } from "react";
import { TextInput, View, Image } from "react-native";

import { AssetManager } from "@AssetManager";
import { CompassMeasurementDTO, WidgetTheme } from "@V2/Types/ProjectTypes";
import { translations } from "@V2/Translations/index";
import { FontService } from "@V2/Services_Core/FontService";
import { RegexService } from "@V2/Services/RegexService";
import { ConfigService } from "@V2/Services/ConfigService";
import { HapticsService } from "@V2/Services/HapticsService";

import { Text } from "@V2/Text/index";
import { Button } from "@V2/Button/index";

export const Measurement = memo((props: {
  measurement: CompassMeasurementDTO
  lockedData: boolean | undefined
  allowMeasurementLabelChange: boolean | undefined
  allowMeasurementDataChange: boolean | undefined
  allowMeasurementDeletion: boolean | undefined
  editMode: boolean
  theme: WidgetTheme
  onHeadingChange: (newHeading: number) => void
  onDipChange: (newDip: number) => void
  onMeasurementLabelChange: (newLabel: string) => void
  onMeasurementDelete: () => void
}) => {

  const {
    id,
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
          <View
            style={{
              borderRadius: 30,
              borderWidth: 3,
              borderColor: props.theme.font,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              width: 60,
            }}
          >
            <Image
              source={{ uri: AssetManager.getMarkerImage(markerIcon) }}
              resizeMode="contain"
              style={{
                height: 40,
                width: 40,
                transform: [{ rotate: `${imageHeading}deg` }],
              }}
            />
          </View>
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

    </View>
  )
});


/**
 * Accepts and returns the values of `heading (in the range of 0-360 degrees)`
 * and `dip (in the range of 0 to 90 degrees)` as `strings` to allow easier input handling.
 */
const Input_Measurement = memo((props: {
  heading: string;
  dip: string;
  lockedData: boolean | undefined
  allowMeasurementDataChange: boolean | undefined
  theme: WidgetTheme
  onHeadingChange: (text: number) => void;
  onDipChange: (text: number) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.compass[config.language], []);
  const [heading ,setHeading] = useState<string>(props.heading);
  const [dip     ,setDip    ] = useState<string>(props.dip);
  const [invalidHeading ,setInvalidHeading ] = useState<boolean>(false);
  const [invalidDip     ,setInvalidDip     ] = useState<boolean>(false);

  const onHeadingChange = useCallback((text: string) => {
    
    let valid = RegexService.rule['heading'].test(text);
    text = text.replace(',', '.');
    text = text.replace(' ', '');

    const number = Number(text);
    switch (true) {
      case isNaN(number):                valid = false; break;
      case number < 0:                   valid = false; break;
      case number > 360:                 valid = false; break;
      case number >= 0 && number <= 360: valid = true ; break;
    }

    if (valid) {
      setHeading(text)
      setInvalidHeading(false);
      props.onHeadingChange(number);
    } else {
      setHeading(text);
      setInvalidHeading(true);
    }
  }, []);

  const onDipChange = useCallback((text: string) => {

    let valid = RegexService.rule['dip'].test(text);
    text = text.replace(',', '.');
    
    const number = Number(text);
    switch (true) {
      case isNaN(number):               valid = false; break;
      case number < 0:                  valid = false; break;
      case number > 90:                 valid = false; break;
      case number >= 0 && number <= 90: valid = true ; break;
    }

    if (valid) {
      setDip(text);
      setInvalidDip(false);
      props.onDipChange(number);
    } else {
      setInvalidDip(true);
      setDip(text);
    }
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: props.theme.font,
        }}
      >
        {R['H']}
      </Text>
      <TextInput
        editable={(props.allowMeasurementDataChange ?? false) && (!props.lockedData)}
        style={{
          width: 60,
          color: invalidHeading ? props.theme.wrong : props.theme.font,
          fontSize: 14,
          paddingVertical: 0,
          paddingHorizontal: 5,
        }}
        textAlign="right"
        value={heading}
        keyboardType="numeric"
        onChangeText={(text) => onHeadingChange(text)}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {'/'}
      </Text>
      <TextInput
        editable={(props.allowMeasurementDataChange ?? false) && (!props.lockedData)}
        style={{
          width: 60,
          fontSize: 14,
          color: invalidDip ? props.theme.wrong : props.theme.font,
          paddingVertical: 0,
          paddingHorizontal: 5,
        }}
        textAlign="left"
        value={dip}
        keyboardType="numeric"
        onChangeText={(text) => onDipChange(text)}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: props.theme.font,
        }}
      >
        {R['D']}
      </Text>
    </View>
  )
})

const ItemLabel = memo((props: {
  label: string
  lockedData: boolean | undefined
  allowMeasurementLabelChange: boolean | undefined
  theme: WidgetTheme
  onLabelChange: (label: string) => void
}) => {

  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setFocused(true);
    HapticsService.vibrate('success');
  }, []);

  const isLabelEmpty = props.label === '';

  return (
    <TextInput
      editable={(props.allowMeasurementLabelChange ?? false) && (!props.lockedData)}
      style={{
        color: focused ? props.theme.background : props.theme.font,
        backgroundColor: focused ? props.theme.font : props.theme.background,
        fontFamily: isLabelEmpty ? FontService.FONT_FAMILY.p : FontService.FONT_FAMILY.h3,
        fontSize: 14,
        borderRadius: 5,
        paddingVertical: 0,
        paddingHorizontal: 5,
        width: '100%',
      }}
      placeholder={'Measurement name'}
      placeholderTextColor={focused ? props.theme.background : props.theme.font_placeholder}
      value={props.label}
      onChangeText={(text) => props.onLabelChange(text)}
      onBlur={() => setFocused(false)}
      onFocus={() => onFocus()}
      multiline
    />
  );
});
