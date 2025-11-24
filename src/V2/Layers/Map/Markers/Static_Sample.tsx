import { memo, useEffect, useState } from "react";

import { MapFilter, OpenEntity, SampleMapScope } from "@V2/Types/AppTypes";
import { SampleDTO } from "@V2/Types/ProjectTypes";
import { ProjectService } from "@V2/Services/ProjectService";
import { Markers_Sample } from "./Sample";

export const Static_Sample = memo((props: {
  scope: SampleMapScope
  showMap: boolean
  openEntity: OpenEntity | null
  filter: MapFilter
}) => {

  const [sampleDTO, SetSampleDTO] = useState<SampleDTO | null>(null);

  useBuildSample({
    id_project: props.scope.id_project,
    id_sample: props.scope.id_sample,
    showMap: props.showMap,
    onSampleBuilt: SetSampleDTO
  });

  if (sampleDTO === null) {
    return <></>
  }

  return (
    <Markers_Sample
      sampleDTO={sampleDTO}
      openEntity={props.openEntity}
      filter={props.filter}
    />
  )
})

function useBuildSample(o: {
  id_project: string
  id_sample: string
  showMap: boolean
  onSampleBuilt: (sampleDTO: SampleDTO) => void
}) {
  useEffect(() => {
    if (o.showMap) {
      /**
       * We wait the map animation opening to not stutter the UI,
       * since this will markers renders when map opens.
      */
      const { id_project, id_sample } = o;
      setTimeout(() => {
        ProjectService.buildSampleDTO({ id_project, id_sample,})
        .then(o.onSampleBuilt);
      }, 200);
    }
  }, [o.showMap, o.id_project, o.id_sample]);
}