import { Paths } from 'expo-file-system';
import { LTS_VERSION } from './Version';

export const path = {
  APP_ROOT_PATH: Paths.document.uri.slice(0, -1),
  getDir() {
    return  { // TODO: Rename it to 'FilePath'
      ROOT                   : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}`,
      CONFIG                 : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Config`,
      CREDENTIALS            : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Credentials`,
      TEMP                   : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/TemporaryFiles`,
      EXPORTED_FILES         : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/ExportedFiles`,
      SYNC_DATA              : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/SyncData`,
      PROJECTS: {
        ROOT                 : (                                     ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects`,
        PROJECT : {
          ROOT               : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}`,
          PROJECT_WIDGETS    : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/projectWidgets`,
          TEMPLATE_WIDGETS   : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/templateWidgets`,
          SAMPLES: {
            ROOT             : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples`,
            SAMPLE: {
              ROOT           : (id_project: string, id_sample: string) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples/${id_sample}`,
              SAMPLE_WIDGETS : (id_project: string, id_sample: string) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/samples/${id_sample}/sampleWidgets`,
            },
          },
          MEDIA: {
            ROOT             : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media`,
            PICTURES         : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/pictures`,
            VIDEOS           : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/videos`,
            AUDIOS           : (id_project: string                   ) => `${this.APP_ROOT_PATH}/${LTS_VERSION}/Projects/${id_project}/media/audios`,
          },
        },
      },
    };
  }
}