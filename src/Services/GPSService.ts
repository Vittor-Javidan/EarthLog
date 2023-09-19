import { AltitudeDTO, CoordinateDTO, GPSAccuracyDTO, GPS_DTO } from '@Types/index';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import UtilService from './UtilService';

export default class GPSService {

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

  private iosInterval: NodeJS.Timer | null = null;
  private androidLocationSubscription: Location.LocationSubscription | null = null;
  private watchCoordinate: boolean = true;
  private watchAltitude: boolean = true;
  private gpsData: GPS_DTO;
  private minAccuracy = {
    coordinate: 20,
    altitude: 10,
  };

  constructor(gpsData: GPS_DTO) {
    this.gpsData = UtilService.deepCopy(gpsData);
  }

  enableCoordinates(boolean: boolean) {
    this.watchCoordinate = boolean;
    if (this.watchCoordinate === false && this.gpsData.coordinates !== undefined) {
      delete this.gpsData.coordinates;
    }
  }

  enableAltitude(boolean: boolean) {
    this.watchAltitude = boolean;
    if (this.watchAltitude === false && this.gpsData.altitude !== undefined) {
      delete this.gpsData.altitude;
    }
  }

  setGpsData(gpsData: GPS_DTO) {
    this.gpsData = UtilService.deepCopy(gpsData);
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
      if (newDataAvailable) { callback(UtilService.deepCopy(this.gpsData)); }
    };

    await GPSService.getPermission(async () => {

      if (Platform.OS === 'ios' && this.iosInterval === null) {
        await this.iosWatcher(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1,
        }, (coordinates) => sendData(coordinates));
        return;
      }

      if (this.androidLocationSubscription === null) {
        await this.androidWatcher({
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,
        }, (coordinates) => sendData(coordinates));
        return;
      }
    });
  }

  stopWatcher() {

    if (this.iosInterval !== null) {
      clearInterval(this.iosInterval);
      this.iosInterval = null;
      return;
    }

    if (this.androidLocationSubscription !== null) {
      this.androidLocationSubscription.remove();
      this.androidLocationSubscription = null;
      return;
    }
  }

  private async iosWatcher(
    options: Location.LocationOptions,
    callback: Location.LocationCallback
  ) {
    this.iosInterval = setInterval(async () => {
      callback(await Location.getCurrentPositionAsync(options));
    }, 500);
  }

  private async androidWatcher(
    options: Location.LocationOptions,
    callback: Location.LocationCallback
  ) {
    this.androidLocationSubscription = await Location.watchPositionAsync(options, callback);
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
