import { SyncData, Status } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';

type SyncOperation = 'creation' | 'updating' | 'deletion';

export default class SyncService {

  static syncData: SyncData[] = [];

  static getSyncData(id_project: string): SyncData {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        return this.syncData[i];
      }
    }
    return {
      id_project: '',
      project: 'new',
      widgets_Project: {},
      samples: {},
      widgets_Template: {},
      widgets_Samples: {},
    };
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

  static async syncData_Project(id_project: string) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        this.defineStatus_Project(this.syncData[i]);
        await DatabaseService.updateSyncFile(this.syncData[i]);
        return;
      }
    }
  }

  static async syncData_ProjectWidgets(
    id_project: string,
    id_widget: string,
    operation: SyncOperation
  ) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        this.defineStatus_Project(this.syncData[i]);
        this.defineStatus(id_widget, operation, this.syncData[i].widgets_Project);
        await DatabaseService.updateSyncFile(this.syncData[i]);
        return;
      }
    }
  }

  static async syncData_TemplateWidgets(
    id_project: string,
    id_widget: string,
    operation: SyncOperation
  ) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        this.defineStatus_Project(this.syncData[i]);
        this.defineStatus(id_widget, operation, this.syncData[i].widgets_Template);
        await DatabaseService.updateSyncFile(this.syncData[i]);
        return;
      }
    }
  }

  static async syncData_Samples(
    id_project: string,
    id_sample: string,
    operation: SyncOperation
  ) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {

        this.defineStatus_Project(this.syncData[i]);
        this.defineStatus(id_sample, operation, this.syncData[i].samples);

        if (operation === 'deletion') {
          delete this.syncData[i].widgets_Samples[id_sample];
        }

        if (operation === 'creation') {
          const allSampleWidgets = await DatabaseService.getAllWidgets_Sample(id_project, id_sample);
          this.syncData[i].widgets_Samples[id_sample] = {};
          for (let j = 0; j < allSampleWidgets.length; j++) {
            const { id_widget } = allSampleWidgets[j];
            this.syncData[i].widgets_Samples[id_sample][id_widget] = 'new';
          }
        }

        await DatabaseService.updateSyncFile(this.syncData[i]);
        return;
      }
    }
  }

  static async syncData_SampleWidgets(
    id_project: string,
    id_sample: string,
    id_widget: string,
    operation: SyncOperation
  ) {
    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {
        this.defineStatus_Project(this.syncData[i]);
        this.defineStatus(id_sample, 'updating', this.syncData[i].samples);
        this.defineStatus(id_widget, operation, this.syncData[i].widgets_Samples[id_sample]);
        await DatabaseService.updateSyncFile(this.syncData[i]);
        return;
      }
    }
  }

  private static defineStatus_Project(syncStatus: SyncData) {
    switch (syncStatus.project) {
      case 'modified': /*Do nothing*/ break;
      case 'new':      /*Do nothing*/ break;
      case 'uploaded': syncStatus.project = 'modified'; break;
    }
  }

  private static defineStatus(
    id_element: string,
    operation: SyncOperation,
    recordList: Record<string, Status | 'deleted'>
  ) {
    switch (operation) {

      case 'creation': {
        switch (recordList[id_element]) {
          case 'uploaded': alert(`Sync Error: the element of id ${id_element}} should not exist`); break;
          case 'modified': alert(`Sync Error: the element of id ${id_element}} should not exist`); break;
          case 'new':      alert(`Sync Error: the element of id ${id_element}} should not exist`); break;
          case 'deleted':  alert(`Sync Error: the element of id ${id_element}} should not exist`); break;
          default: {
            recordList[id_element] = 'new';
          }
        }
        break;
      }

      case 'updating': {
        switch (recordList[id_element]) {
          case 'modified': /*Do nothing*/ break;
          case 'new':      /*Do nothing*/ break;
          case 'uploaded': recordList[id_element] = 'modified';    break;
          case 'deleted':  alert(`Sync Error: the element of id ${id_element}} was deleted already`); break;
          default: {
            recordList[id_element] = 'new';
          }
        }
        break;
      }

      case 'deletion': {
        switch (recordList[id_element]) {
          case 'modified': recordList[id_element] = 'deleted'; break;
          case 'uploaded': recordList[id_element] = 'deleted'; break;
          case 'new':      delete recordList[id_element];      break;
          case 'deleted':  alert(`Syn Error: the element of id ${id_element}} should be deleted already`); break;
          default: {
            recordList[id_element] = 'new';
          }
        }
        break;
      }
    }
  }











  // ===============================================================================================
  // UPLOAD / DOWNLOAD RELATED METHODS
  // ===============================================================================================

  /**
   * removes all 'deleted' status, and replace all 'modified' and 'new' status to 'uploaded'.
   * It saves the files after the process.
   */
  static async updateSyncDataAfterUpload(id_project: string) {

    for (let i = 0; i < this.syncData.length; i++) {
      if (this.syncData[i].id_project === id_project) {

        this.syncData[i].project = 'uploaded';

        for (const id_widget in this.syncData[i].widgets_Project) {
          defineStatus(id_widget, this.syncData[i].widgets_Project);
        }
        for (const id_widget in this.syncData[i].widgets_Template) {
          defineStatus(id_widget, this.syncData[i].widgets_Template);
        }
        for (const id_sample in this.syncData[i].samples) {
          defineStatus(id_sample, this.syncData[i].samples);
        }
        for (const id_sample in this.syncData[i].widgets_Samples) {
          for (const id_widget in this.syncData[i].widgets_Samples[id_sample]) {
            defineStatus(id_widget, this.syncData[i].widgets_Samples[id_sample]);
          }
        }

        await DatabaseService.updateSyncFile(this.syncData[i]);
      }
    }

    function defineStatus(
      id_element: string,
      recordList: Record<string, Status | 'deleted'>
    ) {
      switch (recordList[id_element]) {
        case 'uploaded':  /*Do nothing*/ break;
        case 'modified':  recordList[id_element] = 'uploaded'; break;
        case 'new':       recordList[id_element] = 'uploaded'; break;
        case 'deleted':   delete recordList[id_element];       break;
      }
    }
  }
}
