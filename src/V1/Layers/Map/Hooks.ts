import { useEffect, useMemo, useState } from "react";
import MapView from "react-native-maps";

import { CompassMeasurementDTO, CoordinateDTO, ProjectDTO } from "@V1/Types/ProjectTypes";
import { GPSWatcherService } from "@V1/Services_Core/GPSService";
import { ProjectService } from "@V1/Services/ProjectService";
import { CacheService } from "@V1/Services/CacheService";
import { MapScope } from "@V1/Types/AppTypes";

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

export function useOpenMeasurementLocation(o: {
  openMeasurement: CompassMeasurementDTO | null,
  scope: MapScope,
  showMap: boolean,
  onGoToCoordinate: (coordinate: CoordinateDTO) => void,
}) {
  const { openMeasurement, scope, showMap } = o;

  useEffect(() => {
    if (openMeasurement !== null) {

      const measurementCoordinates = openMeasurement.coordinates;
      if (measurementCoordinates !== undefined) {
        o.onGoToCoordinate({ lat: measurementCoordinates.lat, long: measurementCoordinates.long, accuracy: 0 });
        return;
      }

      switch (scope.type) {

        case 'sample': {
          const sampleSetting = CacheService.getSampleFromCache({ id_sample: scope.id_sample});
          if (
            sampleSetting.gps !== undefined &&
            sampleSetting.gps.coordinates !== undefined
          ) {
            const coordinates = sampleSetting.gps.coordinates;
            o.onGoToCoordinate({ lat: coordinates.lat, long: coordinates.long, accuracy: 0 });
            return;
          }
          break
        }

        case 'project': {
          const projectSetting = CacheService.getProjectFromCache({ id_project: scope.id_project});
          if (
            projectSetting.gps !== undefined &&
            projectSetting.gps.coordinates !== undefined
          ) {
            const coordinates = projectSetting.gps.coordinates;
            o.onGoToCoordinate({ lat: coordinates.lat, long: coordinates.long, accuracy: 0 });
            return;
          }
          break
        }
      }
    }
  }, [scope, showMap]) 
}