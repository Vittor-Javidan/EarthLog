import { AltitudeDTO, CoordinateDTO, GPS_DTO } from '@Types/index';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export class GPSWatcherService {

  private iosInterval: NodeJS.Timer | null = null;
  private androidLocationSubscription: Location.LocationSubscription | null = null;
  private gpsData: GPS_DTO;

  constructor(initialGPSData: GPS_DTO) {
    this.gpsData = initialGPSData;
  }

  async watchPositionAsync(
    callback: (gpsData: GPS_DTO) => void,
    realTimeCoordinateAccuracy: (coord: number | null) => void,
    realTimeAltitudeAccuracy: (coord: number | null) => void
  ) {

    let newDataAvailable: boolean = false;

    if (Platform.OS === 'ios' && this.iosInterval === null) {
      await this.iosWatcher(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1,
      }, (coordinates) => {
        realTimeCoordinateAccuracy(coordinates.coords.accuracy);
        realTimeAltitudeAccuracy(coordinates.coords.altitudeAccuracy);
        this.updateCoordinate(coordinates, () => { newDataAvailable = true; });
        this.updateAltitude(coordinates, () => { newDataAvailable = true; } );
        if (newDataAvailable) {
          callback(this.gpsData);
        }
      });
      return;
    }

    if (this.androidLocationSubscription === null) {
      await this.androidWatcher({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 500,
      }, (coordinates) => {
        realTimeCoordinateAccuracy(coordinates.coords.accuracy);
        realTimeAltitudeAccuracy(coordinates.coords.altitudeAccuracy);
        this.updateCoordinate(coordinates, () => { newDataAvailable = true; });
        this.updateAltitude(coordinates, () => { newDataAvailable = true; } );
        if (newDataAvailable) {
          callback(this.gpsData);
        }
      });
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

    const newLat = coordinates.coords.latitude;
    const newLong = coordinates.coords.longitude;
    const newAccuracy = coordinates.coords.accuracy;

    if (newAccuracy === null) {
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

    const newAltitude = coordinates.coords.altitude;
    const newAccuracy = coordinates.coords.altitudeAccuracy;

    if (newAccuracy === null || newAltitude === null) {
      return;
    }

    const altitudeDTO: AltitudeDTO = {
      value: newAltitude,
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
