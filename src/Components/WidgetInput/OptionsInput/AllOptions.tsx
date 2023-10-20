import React, { memo } from 'react';

import { OptionData, WidgetTheme } from '@Types/ProjectTypes';

import { OptionButton } from './OptionButton';

export const AllOptions = memo((props: {
  options: OptionData[]
  theme: WidgetTheme
  onCheckedChange: (checked: boolean, index: number) => void
  onOptionLabelChange: (newLabel: string, index: number) => void
}) => {
  const AllOptionButtons = props.options.map((option, index) => (
    <OptionButton
      key={index}
      label={option.optionLabel}
      checked={option.checked}
      onCheckedChange={(checked) => props.onCheckedChange(checked, index)}
      onOptionLabelChange={(newLabel) => props.onOptionLabelChange(newLabel, index)}
      theme={props.theme}
    />
  ));
  return <>{AllOptionButtons}</>;
});
