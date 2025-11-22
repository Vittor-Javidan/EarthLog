import { memo } from "react";
import { View } from "react-native";
import { Z_INDEX } from "@V2/Globals/zIndex";
import { MapButton } from "../../Buttons";

export const DefaultUI = memo((props: {
  show: boolean;
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  onFilterPress: () => void;
  onCurrentPosition: () => void;
}) => {
  return props.show ? (
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
  ) : <></>;
})