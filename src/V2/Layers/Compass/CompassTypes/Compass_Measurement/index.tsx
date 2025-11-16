import React, { memo, useCallback,  useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ConfigService } from "@V2/Services/ConfigService";
import { useAccelerometer } from "@V2/Sensors/Accelerometer";
import { CompassAPI } from "@V2/Layers/API/Compass";
import { useTimeout } from "@V2/Hooks/index";
import { useCompass } from "../../Hooks";

import { Text } from "@V2/Text/index";
import { Icon } from "@V2/Icon/index";
import { LC } from "../../__LC__";

const HORIZONTAL_DEGREES_THRESHOLD = 4;
const DIP_DEGREES_THRESHOLD = 6;

export const Compass_Measurement = memo(() => {

  const {top  , bottom} = useSafeAreaInsets();
  const {width, height} = Dimensions.get('screen');
  const [declination    ,setDeclination    ] = useState<number>(ConfigService.config.compassDeclination);
  const [measuredAverage,setMeasuredAverage] = useState<number>(ConfigService.config.compassAverageMeasurements);
  const [compass        ,setCompass        ] = useState<'COMPASS' | 'BUBBLE'>('COMPASS');
  const [heading        ,setHeading        ] = useState(0);
  const [pitch          ,setPitch          ] = useState(0);
  const [roll           ,setRoll           ] = useState(0);
  const [z              ,setZ              ] = useState(0);

  const [measuredHeading , setMeasuredHeading  ] = useState<string>('0');
  const [measuredDip     , setMeasuredDip      ] = useState<string>('0');

  const onDoneMeasuring = useCallback(() => {
    CompassAPI.triggerOnMeasurementTake(Number(measuredHeading), Number(measuredDip));
    CompassAPI.closeCompass();
  }, [measuredDip, measuredHeading]);

  const onNewMeasurement = useCallback(() => {
    CompassAPI.triggerOnMeasurementTake(Number(measuredHeading), Number(measuredDip));
    setMeasuredHeading('0');
    setMeasuredDip('0');
  }, [measuredDip, measuredHeading]);

  const onCancelMeasuring = useCallback(() => {
    CompassAPI.closeCompass();
  }, [])

  const onPressDisplay_Compass = useCallback((heading: number) => {
    setMeasuredHeading(heading.toFixed(2));
  }, [])

  const onPressDisplay_BubbleLevel = useCallback((dip: number) => {
    setMeasuredDip(dip.toFixed(2));
  }, [])

  const onDisplayChange_Compass     = useCallback(() => { setCompass('COMPASS') }, []);
  const onDisplayChange_BubbleLevel = useCallback(() => { setCompass('BUBBLE')  }, []);

  useTimeout(() => {
    ConfigService.config.compassDeclination = declination;
    ConfigService.saveConfig();
  }, [declination], 200)

  useTimeout(() => {
    ConfigService.config.compassAverageMeasurements = measuredAverage;
    ConfigService.saveConfig();
  }, [measuredAverage], 200)

  useCompass({
    phoneOffset: 'PORTRAIT_OFFSET',
    onUpdate: (heading) => setHeading(heading),
  }, [declination]);

  useAccelerometer({
    threshold: compass === 'COMPASS' ? HORIZONTAL_DEGREES_THRESHOLD : DIP_DEGREES_THRESHOLD,
    onUpdate: (pitch, roll, z) => {
      setPitch(pitch);
      setRoll(roll);
      setZ(z);
    },
  });

  return (
    <View
      style={{
        marginTop: top,
        height: height - top - bottom,
        width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >

      {/* HEADER */}
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          gap: 5,
        }}
      >
        <LC.Input.Declination
          declination={declination}
          onDeclinationChange={setDeclination}
        />
        <LC.Input.Average
          average={measuredAverage}
          onAverageChange={setMeasuredAverage}
        />
      </View>

      {/* BODY */}
      {compass === 'COMPASS' && (<>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LC.Input.Measurement
            heading={measuredHeading}
            dip={measuredDip}
            onHeadingChange={setMeasuredHeading}
            onDipChange={setMeasuredDip}
          />
          <LC.Display.Compass
            heading={heading}
            pitch={pitch}
            roll={roll}
            disableAverage={false}
            measuredAverage={measuredAverage}
            horizontalThreshold={HORIZONTAL_DEGREES_THRESHOLD}
            onCalculatedAvg={onPressDisplay_Compass}
          />
          <LC.Display.MiniBubbleLevel
            pitch={pitch}
            roll={roll}
            onPress={onDisplayChange_BubbleLevel}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          />
        </View>
      </>)}
      {compass === 'BUBBLE' && (<>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LC.Input.Measurement
            heading={measuredHeading}
            dip={measuredDip}
            onHeadingChange={setMeasuredHeading}
            onDipChange={setMeasuredDip}
          />
          <LC.Display.BubbleLevel
            pitch={pitch}
            roll={roll}
            z={z}
            measuredAverage={measuredAverage}
            disableAverage={false}
            dipThreshold={DIP_DEGREES_THRESHOLD}
            onCalculatedAvg={onPressDisplay_BubbleLevel}
          />
          <LC.Display.MiniCompass
            heading={heading}
            onPress={onDisplayChange_Compass}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          />
        </View>

      </>)}

      {/* FOOTER */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}
      >
        <Cancel
          onPress={onCancelMeasuring}
        />
        <New
          onPress={onNewMeasurement}
        />
        <ConfirmButton
          onPress={onDoneMeasuring}
        />
      </View>
    </View>
  );
});

const ConfirmButton = memo((props: {
  onPress: () => void
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        width: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? '#000' : '#0f0',
        padding: 10,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: pressed ? '#0f0' : '#000',
      }}
    >
      <Icon
        iconName="save"
        color={pressed ? '#0f0' : '#000'}
        fontSize={30}
      />
      <Icon
        iconName="checkmark"
        color={pressed ? '#0f0' : '#000'}
        fontSize={30}
      />
    </Pressable>
  )
})


const New = memo((props: {
  onPress: () => void
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        width: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? '#000' : '#fff',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: pressed ? '#fff' : '#000',
      }}
    >
      <Icon
        iconName="save"
        color={pressed ? '#fff' : '#000'}
        fontSize={30}
      />
      <Text h1
        style={{ color: pressed ? '#fff' : '#000' }}
      >
        {'+'}
      </Text>
    </Pressable>
  )
})

const Cancel = memo((props: {
  onPress: () => void
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={() => props.onPress()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        width: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? '#000' : '#f00',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: pressed ? '#f00' : '#000',
      }}
    >
      <Icon
        iconName="close"
        color={pressed ? '#f00' : '#000'}
        fontSize={40}
      />
    </Pressable>
  )
})
