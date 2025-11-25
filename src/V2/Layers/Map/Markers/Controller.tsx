import { memo } from "react";

import {
  OpenEntity
} from "@V2/Types";

import { Dynamic_Measure } from "./Dynamic_Measure";
import { Dynamic_GPS } from "./Dynamic_GPS";

export const Controller = memo((props: {
  openEntity: OpenEntity | null;
}) => {

  if (props.openEntity === null)  {
    return <></>;
  }

  if (props.openEntity.type === 'compass measurement') {
    return (
      <Dynamic_Measure
        openMeasurement={props.openEntity.entity}
      />
    )
  }

  if (props.openEntity.type === 'gps input') {
    return (
      <Dynamic_GPS
        openGPS={props.openEntity.entity}
        source={props.openEntity.source}
      />
    )
  }

  return <></>;
});