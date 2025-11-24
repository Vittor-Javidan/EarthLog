import React, { memo } from 'react';

import {
  SelectionOptionData,
  WidgetTheme
} from '@V1/Types';

import { SelectionOptionButton } from './SelectionOptionButton';

export const AllSelectionOptions = memo((props: {
  options: SelectionOptionData
  editMode: boolean
  allowOptionLabelChange: boolean | undefined
  theme: WidgetTheme
  onSelect: (selectionOption: string) => void
  onOptionLabelChange: (newLabel: string, index: number) => void
  onOptionDelete: (index: number) => void
}) => {
  const AllOptionButtons = props.options.options.map((option, index) => (
    <SelectionOptionButton
      key={option.id + index}
      label={option.optionLabel}
      checked={option.id === props.options.id_selected}
      editMode={props.editMode}
      allowOptionLabelChange={props.allowOptionLabelChange}
      onPress={() => props.onSelect(option.id)}
      onOptionLabelChange={(newLabel) => props.onOptionLabelChange(newLabel, index)}
      onOptionDelete={() => props.onOptionDelete(index)}
      theme={props.theme}
    />
  ));
  return <>{AllOptionButtons}</>;
});
