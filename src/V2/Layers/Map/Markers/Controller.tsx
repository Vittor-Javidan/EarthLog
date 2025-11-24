import { memo } from "react";
import { OpenEntity } from "@V2/Types/AppTypes";
import { Dynamic_Measure } from "./Dynamic_Measure";

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

  return <></>;
});