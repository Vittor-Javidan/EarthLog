import { memo } from "react";
import { Z_INDEX } from "@V1/Globals/zIndex";
import { MapButton } from "../../Buttons";

export const DefaultUI = memo((props: {
  show: boolean;
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  onCurrentPosition: () => void;
}) => {
  return props.show ? (<>
    <MapButton.CurrentPosition
      followUser={props.followUser}
      onPress={props.onCurrentPosition}
      showIndicator={props.showCurrentPositionIndicator}
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        bottom: 40,
        left: 10,
      }}
    />
  </>) : <></>;
})