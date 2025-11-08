import { Bullet } from './BulletButton';
import { Checkbox } from './CheckboxButton';
import { DeleteSwipeButton } from './DeleteSwipeButton';
import { IconButton } from './IconButton';
import { RoundedIconButton } from './RoundedIconButton';
import { TextWithIcon } from './TextWithIconButton';

export const Button = {
  Icon:         IconButton,
  RoundedIcon:  RoundedIconButton,
  TextWithIcon: TextWithIcon,
  Checkbox:     Checkbox,
  Bullet:       Bullet,
  ConfirmSwipe: DeleteSwipeButton,
};
