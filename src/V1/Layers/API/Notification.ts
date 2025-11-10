import { Dispatch, SetStateAction } from 'react';
 
export type NotificationIcons = {
  gpsAcquisition: boolean;
}
export class NotificationAPI {

  private static iconSetter: Dispatch<SetStateAction<NotificationIcons>> | null = null;

  static registerIconSetter(setter: Dispatch<SetStateAction<NotificationIcons>>) { this.iconSetter = setter; }

  static setGPSAcquisitionIcon(visible: boolean) {
    if (this.iconSetter !== null) {
      this.iconSetter((prev) => ({ ...prev, gpsAcquisition: visible }));
    }
  }
}