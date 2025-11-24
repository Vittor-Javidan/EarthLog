import { memo } from "react";

import {
  MapFilter,
  MapScope,
  MapShowSetter,
  OpenEntity
} from "@V2/Types";

import { Static_Project } from "./Static_Project";
import { Static_Sample } from "./Static_Sample";

export const StaticDisplay = memo((props: {
  scope: MapScope
  show: MapShowSetter
  openEntity: OpenEntity | null
  filter: MapFilter
}) => {

  if (
    // props.show.ui_PinGPS ||
    props.show.ui_Default ||
    props.show.ui_PinMeasurement
  ) {
    switch (props.scope.type) {
      case "project": return (
        <Static_Project
          scope={props.scope}
          showMap={props.show.map}
          openEntity={props.openEntity}
          filter={props.filter}
        />
      )
      case "sample": return (
        <Static_Sample
          scope={props.scope}
          showMap={props.show.map}
          openEntity={props.openEntity}
          filter={props.filter}
        />
      )
      default: return <></>
    }
  }

  /*
    Renders all elements inside the project, no matter if is project or sample scope.
    This is important since we want to enable users to draw poligons with no intersections with other vectors,
    allowing perfect snapping to existing lines and polygons.

    Initially, all visible elements must be:
      - Project Info marker
      - Sample Info markers
      - Lines
      - Polygons

    All other elements can be toggled on by the user when pressing the filter button.
  */

  // if (
  //   props.show.ui_DrawLine ||
  //   props.show.ui_DrawPolygon
  // ) {
  //   return (
  //     <Static_Project
  //       scope={props.scope}
  //       showMap={props.show.map}
  //       openEntity={props.openEntity}
  //       filter={props.filter}
  //     />
  //   )
  // }

  return <></>;
})