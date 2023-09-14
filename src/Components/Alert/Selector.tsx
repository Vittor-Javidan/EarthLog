import React from 'react';

import { AlertModalConfig } from '@Types/index';

import Warning from './PopUp/Warning';
import CreateProject from './PopUp/CreateProject';
import ExitApp from './PopUp/ExitApp';
import CreateSample from './PopUp/CreateSample';

export default function Selector(props: {
  config: AlertModalConfig
  onAccept: () => void
  onRefuse: () => void
}) {

  switch (props.config.type) {
    case 'warning': return (
      <Warning
        question={props.config.question}
        onAccept={() => props.onAccept()}
        onRefuse={() => props.onRefuse()}
      />
    );
    case 'exit app': return (
      <ExitApp
        question={props.config.question}
        onAccept={() => props.onAccept()}
        onRefuse={() => props.onRefuse()}
      />
    );
    case 'project creation': return (
      <CreateProject
        onAccept={() => props.onAccept()}
        onRefuse={() => props.onRefuse()}
      />
    );
    case 'sample creation': return (
      <CreateSample
        id_project={props.config.id_project}
        onAccept={() => props.onAccept()}
        onRefuse={() => props.onRefuse()}
      />
    );
  }
}
