import * as Location from 'expo-location';
import { AltitudeDTO, CoordinateDTO, GPSAccuracyDTO, GPS_DTO } from '@V1/Types/ProjectTypes';

export class GPSService {

  static async getPermission(onGranted: () => void) {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === Location.PermissionStatus.GRANTED) {
      onGranted();
    }
  }

  static checkReferenceCoordinateDifference(
    reference: GPS_DTO | undefined,
    compareTo: GPS_DTO | undefined,
    onTresholdRespected: () => void,
    onTresholdbreak: (distance: number) => void
  ) {

    if (
      compareTo === undefined ||
      reference === undefined
    ) {
      onTresholdRespected();
      return;
    }

    if (
      reference.coordinates === undefined ||
      compareTo.coordinates === undefined
    ) {
      onTresholdRespected();
      return;
    }

    const METERS_PER_DEGREE = 111_321;
    const MAX_DEGREE_DIFERENCE: number = 0.000_300_0; // 0.000_010_0 ~ 1.1 meters

    const latitudeDegreesDifference = Math.abs(Math.abs(reference.coordinates.lat) - Math.abs(compareTo.coordinates.lat));
    const longitudeDegreesDifference = Math.abs(Math.abs(reference.coordinates.long) - Math.abs(compareTo.coordinates.long));
    const thresholdAlert = latitudeDegreesDifference > MAX_DEGREE_DIFERENCE || longitudeDegreesDifference > MAX_DEGREE_DIFERENCE;

    const latitudeMetersDiference = METERS_PER_DEGREE * latitudeDegreesDifference;
    const longitudeMetersDiference = METERS_PER_DEGREE * longitudeDegreesDifference;
    const hypotenuse = Math.sqrt((Math.pow(latitudeMetersDiference, 2) + Math.pow(longitudeMetersDiference, 2)));

    thresholdAlert ? onTresholdbreak(Number(hypotenuse.toFixed(2))) : onTresholdRespected();
  }
}

export class GPSWatcherService {

  private androidSubscription: Location.LocationSubscription | null = null;
  private watchCoordinate: boolean = true;
  private watchAltitude: boolean = true;
  private gpsData: GPS_DTO;
  private minAccuracy = {
    coordinate: 20,
    altitude: 10,
  };

  constructor(gpsData: GPS_DTO) {
    this.gpsData = gpsData;
  }

  enableCoordinates(boolean: boolean) {
    this.watchCoordinate = boolean;
    if (this.gpsData.coordinates !== undefined) {
      delete this.gpsData.coordinates;
    }
  }

  enableAltitude(boolean: boolean) {
    this.watchAltitude = boolean;
    if (this.gpsData.altitude !== undefined) {
      delete this.gpsData.altitude;
    }
  }

  setGpsData(gpsData: GPS_DTO) {
    this.gpsData = gpsData;
  }

  async getCurrentPosition(
    callback: (gpsData: GPS_DTO) => void,
  ) {
    await GPSService.getPermission(async () => {

      const gpsData: GPS_DTO = {};
      const coordinates = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      })

      if (
        coordinates.coords.latitude &&
        coordinates.coords.longitude &&
        coordinates.coords.accuracy
      ) {
        gpsData.coordinates = {
          lat: coordinates.coords.latitude,
          long: coordinates.coords.longitude,
          accuracy: Number(coordinates.coords.accuracy.toFixed(2)),
        }
      }

      if (
        coordinates.coords.altitude &&
        coordinates.coords.altitudeAccuracy
      ) {
        gpsData.altitude = {
          value: Number(coordinates.coords.altitude.toFixed(2)), 
          accuracy: Number(coordinates.coords.altitudeAccuracy.toFixed(2)),
        }
      }

      callback(gpsData)
    });
  }

  async watchPositionAsync(
    callback: (gpsData: GPS_DTO) => void,
    accuracy: (accuracy: GPSAccuracyDTO) => void,
  ) {

    const sendData = (coordinates: Location.LocationObject) => {
      accuracy({
        coordinate:  Number((coordinates.coords.accuracy ?? 999).toFixed(2)),
        altitude: Number((coordinates.coords.altitudeAccuracy ?? 999).toFixed(2)),
      });
      let newDataAvailable: boolean = false;
      this.updateCoordinate(coordinates, () => { newDataAvailable = true; });
      this.updateAltitude(coordinates, () => { newDataAvailable = true; } );
      if (newDataAvailable) { callback(this.gpsData); }
    };

    await GPSService.getPermission(async () => {
      if (this.androidSubscription === null) {
        this.androidSubscription = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,
        }, (coordinates) => sendData(coordinates));
        return;
      }
    });
  }

  async watchPositionWithNoFiltering(
    callback: (gpsData: GPS_DTO) => void,
  ) {
    this.androidSubscription = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 500,
    }, (coordinates) => callback({
      coordinates: {
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy ?? 999,
      },
    }));
  }

  stopWatcher() {
    if (this.androidSubscription !== null) {
      this.androidSubscription.remove();
      this.androidSubscription = null;
      return;
    }
  }

  private updateCoordinate(
    coordinates: Location.LocationObject,
    onNewData: () => void
  ) {

    if (this.watchCoordinate === false) {
      return;
    }

    const newLat = coordinates.coords.latitude;
    const newLong = coordinates.coords.longitude;
    const newAccuracy = coordinates.coords.accuracy;

    if (newAccuracy === null || newAccuracy > this.minAccuracy.coordinate) {
      return;
    }

    const coordinatesDTO: CoordinateDTO = {
      lat: newLat,
      long: newLong,
      accuracy: Number(newAccuracy.toFixed(2)),
    };

    if (this.gpsData.coordinates === undefined) {
      this.gpsData.coordinates = coordinatesDTO;
      onNewData();
      return;
    }

    if (this.gpsData.coordinates.accuracy > coordinatesDTO.accuracy) {
      this.gpsData.coordinates = coordinatesDTO;
      onNewData();
      return;
    }
  }

  private updateAltitude(
    coordinates: Location.LocationObject,
    onNewData: () => void
  ) {

    if (this.watchAltitude === false) {
      return;
    }

    const newAltitude = coordinates.coords.altitude;
    const newAccuracy = coordinates.coords.altitudeAccuracy;

    if (newAccuracy === null || newAltitude === null || newAccuracy > this.minAccuracy.altitude) {
      return;
    }

    const altitudeDTO: AltitudeDTO = {
      value: Number(newAltitude.toFixed(2)),
      accuracy: Number(newAccuracy.toFixed(2)),
    };

    if (this.gpsData.altitude === undefined) {
      this.gpsData.altitude = altitudeDTO;
      onNewData();
      return;
    }

    if (this.gpsData.altitude.accuracy > altitudeDTO.accuracy) {
      this.gpsData.altitude = altitudeDTO;
      onNewData();
      return;
    }
  }
}
