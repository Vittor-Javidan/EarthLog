import { StringInput } from './StringInput';
import { GPSInput } from './GPSInputs';
import { InputSelector } from './Selector';
import { BooleanInput } from './BooleanInput';
import { OptionsInput } from './OptionsInput';
import { SelectionInput } from './SelectionInput';

export const WidgetInput = {
  Boolean:   BooleanInput,
  String:    StringInput,
  Options:   OptionsInput,
  Selection: SelectionInput,
  GPS:       GPSInput,
  Selector:  InputSelector,
};
