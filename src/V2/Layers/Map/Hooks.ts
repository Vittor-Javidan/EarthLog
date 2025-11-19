import { useEffect, useMemo, useState } from "react";
import MapView from "react-native-maps";

import { CoordinateDTO, ProjectDTO } from "@V2/Types/ProjectTypes";
import { GPSWatcherService } from "@V2/Services_Core/GPSService";
import { ProjectService } from "@V2/Services/ProjectService";
import { MapScope } from "@V2/Types/AppTypes";

export function useBuildProject(o: {
  id_project: string
  scope: MapScope
  showMap: boolean
  onStartBuilding: () => void
  onProjectBuilt: (projectDTO: ProjectDTO) => void
}) {
  useEffect(() => {
    if (o.showMap) {
      /**
       * We wait the map animation opening to not stutter the UI,
       * since this will markers renders when map opens.
      */
      const id_project = o.id_project;
      o.onStartBuilding();
      setTimeout(() => {
        ProjectService.buildProjectDTO({
          id_project: id_project,
          feedback: (message) => {}
        }).then((dto) => {
          o.onProjectBuilt(dto);
        });
      }, 200);
    }
  }, [o.showMap, o.id_project, o.scope]);
}

export function useFirstPosition(o: {
  showMap: boolean
  onPositionReceived: (position: CoordinateDTO) => void
}, deps: [mapRef: React.RefObject<MapView | null> | null]) {

  const gpsWatcher = useMemo(() => new GPSWatcherService({}), [])
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [mapRef] = deps

  useEffect(() => {
    if (
      o.showMap &&
      mapRef !== null &&
      mapRef.current &&
      firstLoad
    ) {
      gpsWatcher.getCurrentPosition((position) => {
        if (position?.coordinates) {
          o.onPositionReceived({
            lat: position.coordinates.lat,
            long: position.coordinates.long,
            accuracy: position.coordinates.accuracy
          });
        }
        setFirstLoad(false);
      })
    }
    return () => { gpsWatcher.stopWatcher(); }
  }, deps);
}

export function useFollowUserLocation(o: {
  onCoordinateUpdate: (position: CoordinateDTO) => void
}, deps: [followUser: boolean]) {
  const [followUser] = deps
  const gpsWatcher = useMemo(() => new GPSWatcherService({}), [])
  useEffect(() => {
    if (followUser) {
      gpsWatcher.watchPositionWithNoFiltering(
        (position) => {
          if (position?.coordinates) {
            o.onCoordinateUpdate({
              lat: position.coordinates?.lat,
              long: position.coordinates?.long,
              accuracy: position.coordinates?.accuracy,
            })
          }
        },
      )
    } else {
      gpsWatcher.stopWatcher()
    }
    return () => { gpsWatcher.stopWatcher(); }
  }, deps)
}