import { AltitudeDTO, CoordinateDTO, GPS_DTO } from '@Types/index';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export class GPSWatcherService {

  private iosInterval: NodeJS.Timer | null = null;
  private androidLocationSubscription: Location.LocationSubscription | null = null;
  private watchCoordinate: boolean;
  private watchAltitude: boolean;
  private gpsData: GPS_DTO;
  private minAccuracy = {
    coordinate: 20,
    altitude: 10,
  };

  constructor(initialGPSData: GPS_DTO) {
    this.watchCoordinate = initialGPSData.coordinates === undefined ? false : true;
    this.watchAltitude = initialGPSData.altitude === undefined ? false : true;
    this.gpsData = initialGPSData;
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

  setGpsData(initialGPSData: GPS_DTO) {
    this.watchCoordinate = initialGPSData.coordinates === undefined ? false : true;
    this.watchAltitude = initialGPSData.altitude === undefined ? false : true;
    this.gpsData = initialGPSData;
  }

  async watchPositionAsync(
    callback: (gpsData: GPS_DTO) => void,
    accuracy: (coordinate: number | null, altitude: number | null) => void,
  ) {

    const sendData = (coordinates: Location.LocationObject) => {
      accuracy(
        Number((coordinates.coords.accuracy ?? 999).toFixed(2)),
        Number((coordinates.coords.altitudeAccuracy ?? 999).toFixed(2))
      );
      let newDataAvailable: boolean = false;
      this.updateCoordinate(coordinates, () => { newDataAvailable = true; });
      this.updateAltitude(coordinates, () => { newDataAvailable = true; } );
      if (newDataAvailable) { callback(this.gpsData); }
    };

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
