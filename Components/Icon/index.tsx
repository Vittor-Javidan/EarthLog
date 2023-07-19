import Close from './Close';
import Edit from './Edit';
import Home from './Home';
import Language from './Language';
import Menu from './Menu';
import Project from './Project';
import Reset from './Reset';
import Root, { IconName as IconNameType } from './Root';
import Settings from './Settings';
import Theme from './Theme';

export type IconName = IconNameType;
export const Icon = {
  Menu: Menu,
  Home: Home,
  Settings: Settings,
  Language: Language,
  Theme: Theme,
  Project: Project,
  Edit: Edit,
  Reset: Reset,
  Close: Close,
  Root: Root,
};
