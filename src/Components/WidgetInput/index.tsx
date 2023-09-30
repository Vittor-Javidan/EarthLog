import { StringInput } from './StringInput';
import { GPSInput } from './GPSInputs';
import { InputSelector } from './Selector';
import { BooleanInput } from './BooleanInput';

export const WidgetInput = {
  Boolean: BooleanInput,
  String: StringInput,
  GPS: GPSInput,
  Selector: InputSelector,
};
