import React from 'react';
import {View} from 'react-native';

import { WidgetLabel } from '@Services/ProjectService';

import Label from './Label';
import DataDisplay from './DataDisplay';

export default function Root(props: {
  label: WidgetLabel
  isDataWrong: boolean
  showModal: boolean
  shortcutIconButtons: JSX.Element
  dataDisplay: JSX.Element
  modal: JSX.Element
}) {
  return (<>
    <View>
      <Label
        label={props.label}
        wrongData={props.isDataWrong}
        shortcutIconButtons={props.shortcutIconButtons}
      />
      <DataDisplay>
        {props.dataDisplay}
      </DataDisplay>
    </View>
    {props.showModal && props.modal}
  </>);
}
