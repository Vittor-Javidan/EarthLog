import { memo } from "react";
import { MapScope } from "@V2/Types/AppTypes";
import { MapLabel_Project } from "./ProjectDisplay";
import { MapLabel_Sample } from "./SampleDisplay";

export const MapLabel = memo((props: {
  scope: MapScope
}) => {
  switch (props.scope.type) {
    case 'project': return ( <MapLabel_Project scope={props.scope}/> )
    case 'sample': return ( <MapLabel_Sample scope={props.scope}/> )
    case 'navigation': return <></>
  }
})