import { memo } from "react";
import { View } from "react-native";
import { Z_INDEX } from "@V1/Globals/zIndex";
import { MapScope } from "@V1/Types/AppTypes";
import { MapButton } from "../../Buttons";
import { LC } from "../../__LC__";

export const DefaultUI = memo((props: {
  show: boolean;
  scope: MapScope
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  onFilterPress: () => void;
  onCurrentPosition: () => void;
}) => {
  return props.show ? (<>
    <LC.MapLabel scope={props.scope} />
    <View
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        bottom: 40,
        left: 10,
        gap: 10,
      }}
    >
      <MapButton.Filter
        onPress={props.onFilterPress}
      />
      <MapButton.CurrentPosition
        followUser={props.followUser}
        onPress={props.onCurrentPosition}
        showIndicator={props.showCurrentPositionIndicator}
      />
    </View>
  </>) : <></>;
})