import { memo, useCallback, useState } from "react";
import { View } from "react-native";
import { Z_INDEX } from "@V2/Globals/zIndex";
import { MapFilter, MapScope } from "@V2/Types/AppTypes";
import { MapButton } from "../../Buttons";
import { LC } from "../../__LC__";

export const DefaultUI = memo((props: {
  show: boolean;
  scope: MapScope
  filter: MapFilter;
  followUser: boolean;
  showCurrentPositionIndicator: boolean;
  onCurrentPosition: () => void;
  onFilterChange: (filter: MapFilter) => void;
}) => {

  const [showFilter, setShowFilter] = useState(false);

  const onFilterClose = useCallback(() => {
    setShowFilter(false);
  }, []);

  const onFilterOpen = useCallback(() => {
    setShowFilter(true);
  }, []);

  return props.show ? (<>
    <LC.MapLabel scope={props.scope} />
    <LC.Filter
      filter={props.filter}
      onClose={onFilterClose}
      show={showFilter}
      onFilterChange={props.onFilterChange}
      style={{
        position: 'absolute',
        zIndex: Z_INDEX.LAYER_MAP + 1,
        alignSelf: 'center',
      }}
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
      <MapButton.Filter
        onPress={onFilterOpen}
      />
      <MapButton.CurrentPosition
        followUser={props.followUser}
        onPress={props.onCurrentPosition}
        showIndicator={props.showCurrentPositionIndicator}
      />
    </View>
  </>) : <></>;
})