import { memo, useCallback, useState } from "react";

import { MarkerData, ProjectMapScope, SampleMapScope } from "@V2/Types/AppTypes";
import { ProjectDTO } from "@V2/Types/ProjectTypes";
import { useBuildProject } from "../Hooks";
import { MapScope_Project } from "./ProjectDisplay";
import { MapScope_Sample } from "./SampleDisplay";

export const DataDisplay = memo((props: {
  scope: SampleMapScope | ProjectMapScope
  showMap: boolean
  isFirstLoad: boolean
  onMarkerUpdate: (markerData: MarkerData[]) => void
}) => {

  const [projectDTO , setProjectDTO] = useState<ProjectDTO | null>(null);
  const [refreshData, setRefreshData] = useState<boolean>(false);

  const getInitialSampleFilter = useCallback((projectDTO: ProjectDTO): Record<string, boolean> => {
    const initialSampleFilter: Record<string, boolean> = {};
    projectDTO.samples.forEach((sample) => {
      initialSampleFilter[sample.sampleSettings.id_sample] = true;
    });
    return initialSampleFilter;
  }, [projectDTO]);

  useBuildProject({
    id_project: props.scope.id_project,
    onProjectBuilt: (dto) => {
      setProjectDTO(dto);
      setRefreshData(prev => !prev);
    }
  }, [props.showMap]);

  if (props.scope.type === 'project' && projectDTO !== null) {
    return (
      <MapScope_Project
        key={`${refreshData}`}
        scope={props.scope}
        showMap={props.showMap}
        projectDTO={projectDTO}
        initialSampleFilter={getInitialSampleFilter(projectDTO)}
        onMarkerUpdated={(markerData) => {
          props.onMarkerUpdate(markerData)
        }}
      />
    );
  }

  if (props.scope.type === 'sample' && projectDTO !== null) {
    const scope = props.scope
    const sample = projectDTO.samples.find(s => s.sampleSettings.id_sample === scope.id_sample);
    if (sample) {
      return (
        <MapScope_Sample
          key={`${refreshData}`}
          scope={props.scope}
          showMap={props.showMap}
          sampleDTO={sample}
          onMarkerUpdated={(markerData) => {
            props.onMarkerUpdate(markerData)}
          }
        />
      );
    }
  }

  return (<></>);
})