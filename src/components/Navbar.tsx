import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';
import logoDark from '@assets/logo/logo-dark.png';
import Wallet2 from './wallet2';

type props = {
  className?: string;
};

const Navbar = ({ className = 'bg-white shadow-md rounded-lg' }: props) => {
  return (
    <div className="flex justify-between fixed">
      <NavigationMenu
        className={`w-full px-6 py-6 h-20 flex items-center gap-12 transition-all duration-300 ${className}`}
      >
        <div className="flex items-center gap-2">
          <img src={logoDark} className="object-cover h-10" alt="" />
          <div className="text-3xl font-[500]">PhilanthroFi</div>
        </div>
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <Link className="" to={'/about'}>
              About Us
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link className="" to={'/explores'}>
              Explores
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Wallet2></Wallet2>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap"></div>
    </div>
  );
};

export default Navbar;
