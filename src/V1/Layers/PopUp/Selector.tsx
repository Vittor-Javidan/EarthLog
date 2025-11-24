import React, { memo } from 'react';

import {
  ModalConfig
} from '@V1/Types';

import { Warning } from './PopUp/Warning';
import { ExitApp } from './PopUp/ExitApp';
import { CreateProject } from './PopUp/CreateProject';
import { CreateSample } from './PopUp/CreateSample';
import { TemplateWidgetCopy } from './PopUp/TemplateWidgetCopy';
import { DownloadProjects } from './PopUp/DownloadProject';
import { UploadProjects } from './PopUp/UploadProject';
import { ExportProject_DOCX } from './PopUp/ExportProject_DOCX';
import { ExportProject_GPS_CSV } from './PopUp/ExportProject_CSV_GPS';
import { ExportProject_Measurements_CSV } from './PopUp/ExportProject_CSV_Compass';
import { ExportProject_ZIP_IMAGES } from './PopUp/ExportProject_ZIP_IMAGES';
import { DownloadPictures } from './PopUp/DownloadPictures';

export const PopUpSelector = memo((props: {
  config: ModalConfig
  closeModal: () => void
}) => {
  switch (props.config.type) {
    case 'warning': return (
      <Warning
        question={props.config.question}
        closeModal={() => props.closeModal()}
      />
    );
    case 'exit app': return (
      <ExitApp
        closeModal={() => props.closeModal()}
      />
    );
    case 'project creation': return (
      <CreateProject
        closeModal={() => props.closeModal()}
      />
    );
    case 'sample creation': return (
      <CreateSample
        id_project={props.config.id_project}
        sampleNumber={props.config.sampleNumber}
        sampleAlias_Singular={props.config.sampleAlias_Singular}
        closeModal={() => props.closeModal()}
      />
    );
    case 'template widget copy': return (
      <TemplateWidgetCopy
        id_project={props.config.id_project}
        id_sample={props.config.id_sample}
        closeModal={() => props.closeModal()}
      />
    );
    case 'download projects': return (
      <DownloadProjects
        closeModal={() => props.closeModal()}
      />
    );
    case 'upload projects': return (
      <UploadProjects
        config={props.config}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project (DOCX)': return (
      <ExportProject_DOCX
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project GPS (CSV)': return (
      <ExportProject_GPS_CSV
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project compass measurements (CSV)': return (
      <ExportProject_Measurements_CSV
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    )
    case 'download pictures': return (
      <DownloadPictures
        id_project={props.config.id_project}
        picturesIDs={props.config.picturesIDs}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project (ZIP IMAGES)': return (
      <ExportProject_ZIP_IMAGES
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
  }
});
