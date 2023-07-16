import React from 'react';
import {View} from 'react-native';

import { WidgetLabel } from '@Services/ProjectService';

import Label from './Label';
import DataDisplay from './DataDisplay';

export default function Root(props: {
  label: WidgetLabel
  isDataWrong: boolean
  showModal: boolean
  icons: JSX.Element
  dataDisplay: JSX.Element
  modal: JSX.Element
}) {
  return (<>
    <View>
      <Label
        label={props.label}
        wrongData={props.isDataWrong}
        icons={props.icons}
      />
      <DataDisplay>
        {props.dataDisplay}
      </DataDisplay>
    </View>
    {props.showModal && props.modal}
  </>);
}
