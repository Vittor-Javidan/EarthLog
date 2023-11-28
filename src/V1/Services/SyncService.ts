import { SyncData, Status } from '@V1/Types/ProjectTypes';
import DatabaseService from './DatabaseService';

export default class SyncService {

  static syncData: SyncData[] = [];

  static getSyncData(id_project: string): SyncData {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        return this.syncData[i];
      }
    }
    throw Error(`project of id ${id_project} has no sync data`);
  }

  static async loadAllSyncData() {
    this.syncData = await DatabaseService.getAllSyncData();
  }

  static addToSyncData(syncData: SyncData) {
    this.syncData.push(syncData);
  }

  static removeFromSyncData(id_project: string) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        this.syncData.splice(i, 1);
        return;
      }
    }
  }

  static async updateSyncData(syncData: SyncData) {
    await DatabaseService.updateSyncFile(syncData);
    for (let i = 0; i < SyncService.syncData.length; i++) {
      if (SyncService.syncData[i].id_project === syncData.id_project) {
        SyncService.syncData[i] = syncData;
      }
    }
  }

  static identifyMissingPictures(o: {
    id_project: string
  }): string[] {
    const syncData = this.getSyncData(o.id_project);
    return Object.keys(syncData.pictures).filter(key => syncData.pictures[key] === 'on cloud');
  }












  // ===============================================================================================
  // UPLOAD / DOWNLOAD RELATED METHODS
  // ===============================================================================================

  /**
   * removes all 'deleted' status, and replace all 'modified' and 'new' status to 'uploaded'.
   * It saves the files after the process.
   */
  static syncData_AfterUpload(syncData: SyncData) {

    syncData.project = 'uploaded';

    for (const id_widget in syncData.widgets_Project) {
      defineStatus(id_widget, syncData.widgets_Project);
    }
    for (const id_widget in syncData.widgets_Template) {
      defineStatus(id_widget, syncData.widgets_Template);
    }
    for (const id_sample in syncData.samples) {
      defineStatus(id_sample, syncData.samples);
    }
    for (const id_sample in syncData.widgets_Samples) {
      for (const id_widget in syncData.widgets_Samples[id_sample]) {
        defineStatus(id_widget, syncData.widgets_Samples[id_sample]);
      }
    }

    function defineStatus(
      id_element: string,
      recordList: Record<string, Status | 'deleted'>
    ) {
      switch (recordList[id_element]) {
        case 'modified':  recordList[id_element] = 'uploaded'; break;
        case 'new':       recordList[id_element] = 'uploaded'; break;
        case 'deleted':   delete recordList[id_element];       break;
      }
    }
  }

  /**
   * removes all 'deleted' status, and replace all 'modified' and 'new' status to 'uploaded'.
   * It saves the files after the process.
   */
  static async syncData_AfterMediaUpload(id_project: string, id_media: string, type: 'picture' | 'video' | 'audio') {

    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        switch (type) {
          case 'picture': defineStatus(id_media, this.syncData[i].pictures); break;
          case 'video': break;
          case 'audio': break;
        }
        await DatabaseService.updateSyncFile(this.syncData[i]);
      }
    }

    function defineStatus(
      id_element: string,
      recordList: Record<string, Exclude<Status, 'modified'> | 'deleted' | 'on cloud'>
    ) {
      switch (recordList[id_element]) {
        case 'new':       recordList[id_element] = 'uploaded'; break;
        case 'deleted':   delete recordList[id_element];       break;
      }
    }
  }
}