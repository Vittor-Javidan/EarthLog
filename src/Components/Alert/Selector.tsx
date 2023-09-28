import React, { memo } from 'react';

import { AlertModalConfig } from '@Types/AppTypes';

import { Warning } from './PopUp/Warning';
import { ExitApp } from './PopUp/ExitApp';
import { CreateProject } from './PopUp/CreateProject';
import { CreateSample } from './PopUp/CreateSample';
import { TemplateWidgetCopy } from './PopUp/TemplateWidgetCopy';

export const Selector = memo((props: {
  config: AlertModalConfig
  onFinish: () => void
}) => {

  switch (props.config.type) {
    case 'warning': return (
      <Warning
        question={props.config.question}
        onFinish={() => props.onFinish()}
      />
    );
    case 'exit app': return (
      <ExitApp
        onFinish={() => props.onFinish()}
      />
    );
    case 'project creation': return (
      <CreateProject
        onFinish={() => props.onFinish()}
      />
    );
    case 'sample creation': return (
      <CreateSample
        id_project={props.config.id_project}
        onFinish={() => props.onFinish()}
      />
    );
    case 'template widget copy': return (
      <TemplateWidgetCopy
        id_project={props.config.id_project}
        id_sample={props.config.id_sample}
        onFinish={() => props.onFinish()}
      />
    );
  }
});
