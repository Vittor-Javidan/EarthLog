import React, { memo } from 'react';

import { ModalConfig } from '@V2/Types/AppTypes';

import { Warning } from './PopUp/Warning';
import { ExitApp } from './PopUp/ExitApp';
import { CreateProject } from './PopUp/CreateProject';
import { CreateSample } from './PopUp/CreateSample';
import { TemplateWidgetCopy } from './PopUp/TemplateWidgetCopy';
import { DownloadProjects } from './PopUp/DownloadProject';
import { UploadProjects } from './PopUp/UploadProject';
import { ExportProject_DOCX } from './PopUp/ExportProject_DOCX';
import { ExportProject_CSV } from './PopUp/ExportProject_CSV';
import { DownloadPictures } from './PopUp/DownloadPictures';
import { BuySubscription } from './PopUp/BuySubscription';

export const Selector = memo((props: {
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
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project (DOCX)': return (
      <ExportProject_DOCX
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
    case 'export project (CSV)': return (
      <ExportProject_CSV
        id_project={props.config.id_project}
        closeModal={() => props.closeModal()}
      />
    );
    case 'download pictures': return (
      <DownloadPictures
        id_project={props.config.id_project}
        picturesIDs={props.config.picturesIDs}
        closeModal={() => props.closeModal()}
      />
    );
    case 'Buy Subscription': return (
      <BuySubscription
        message={props.config.message}
        closeModal={() => props.closeModal()}
      />
    );
  }
});
