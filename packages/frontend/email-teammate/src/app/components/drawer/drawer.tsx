import { FunctionComponent } from 'react';
import classes from './drawer.module.scss';
interface DrawerProps {
  children: any;
  isOpen: boolean;
}

const Drawer: FunctionComponent<DrawerProps> = ({ children, isOpen }) => {
  return <div className={`${classes.drawer} ${isOpen && classes.isOpen}`}>{children}</div>;
};

export default Drawer;
