import React, { memo } from 'react';

import { OptionData, WidgetTheme } from '@V1/Types/ProjectTypes';

import { OptionButton } from './OptionButton';

export const AllOptions = memo((props: {
  options: OptionData[]
  editMode: boolean
  allowOptionLabelChange: boolean | undefined
  theme: WidgetTheme
  onCheckedChange: (checked: boolean, index: number) => void
  onOptionLabelChange: (newLabel: string, index: number) => void
  onOptionDelete: (index: number) => void
}) => {
  const AllOptionButtons = props.options.map((option, index) => (
    <OptionButton
      key={option.id + index}
      label={option.optionLabel}
      checked={option.checked}
      editMode={props.editMode}
      allowOptionLabelChange={props.allowOptionLabelChange}
      onCheckedChange={(checked) => props.onCheckedChange(checked, index)}
      onOptionLabelChange={(newLabel) => props.onOptionLabelChange(newLabel, index)}
      onOptionDelete={() => props.onOptionDelete(index)}
      theme={props.theme}
    />
  ));
  return <>{AllOptionButtons}</>;
});
