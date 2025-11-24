import { memo, useEffect, useState } from "react";

import { MapFilter, OpenEntity, ProjectMapScope } from "@V1/Types/AppTypes";
import { ProjectDTO } from "@V1/Types/ProjectTypes";
import { ProjectService } from "@V1/Services/ProjectService";
import { Markers_Project } from "./Project";

export const Static_Project = memo((props: {
  scope: ProjectMapScope
  showMap: boolean
  openEntity: OpenEntity | null
  filter: MapFilter
}) => {

  const [projectDTO, setProjectDTO] = useState<ProjectDTO | null>(null);

  useBuildProject({
    id_project: props.scope.id_project,
    showMap: props.showMap,
    onProjectBuilt: setProjectDTO
  });

  if (projectDTO === null) {
    return <></>
  }

  return (
    <Markers_Project
      scope={props.scope}
      projectDTO={projectDTO}
      openEntity={props.openEntity}
      filter={props.filter}
    />
  )
})

function useBuildProject(o: {
  id_project: string
  showMap: boolean
  onProjectBuilt: (projectDTO: ProjectDTO) => void
}) {
  useEffect(() => {
    if (o.showMap) {
      /**
       * We wait the map animation opening to not stutter the UI,
       * since this will markers renders when map opens.
      */
      const id_project = o.id_project;
      setTimeout(() => {
        ProjectService.buildProjectDTO({ id_project })
        .then((dto) => {
          o.onProjectBuilt(dto);
        });
      }, 200);
    }
  }, [o.showMap, o.id_project]);
}