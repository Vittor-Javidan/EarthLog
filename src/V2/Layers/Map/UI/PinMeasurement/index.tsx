import { memo } from "react";
import { View } from "react-native";

import { Z_INDEX } from "@V2/Globals/zIndex";
import { MapScope } from "@V2/Types/AppTypes";
import { LC } from "../../__LC__";
import { MapButton } from "../../Buttons";

export const MeasurementPinUI = memo((props: {
  show: boolean;
  scope: MapScope
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  onReset: () => void;
  onDelete: () => void;
  onSave: () => void;
  onPin: () => void;
  onCurrentPosition: () => void;
}) => {

  const { show } = props;

  return show ? (<>
    <LC.MapLabel scope={props.scope} />
    <LC.MapCrosshair
      show={show}
    />
    <View
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        bottom: 40,
        left: 10,
        gap: 10,
      }}
    >
      <MapButton.Pin
        onPress={props.onPin}
      />
      <MapButton.Save
        onPress={props.onSave}
      />
      <MapButton.Reset
        onPress={props.onReset}
      />
      <MapButton.Delete
        onPress={props.onDelete}
      />
      <MapButton.CurrentPosition
        showIndicator={props.showCurrentPositionIndicator}
        followUser={props.followUser}
        onPress={props.onCurrentPosition}
      />
    </View>
  </>) : <></>
});