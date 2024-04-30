import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';
import logoDark from '@assets/logo-dark.png';

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <NavigationMenu className="bg-white shadow-md rounded-lg w-full px-12 py-6 h-20 flex items-center">
        <div className="flex items-center gap-3">
          <img src={logoDark} className="object-cover h-10" alt="" />
          <div className="text-3xl font-semibold">PhilanthroFi</div>
        </div>
        <NavigationMenuList className="flex gap-2 ml-6">
          <NavigationMenuItem>
            <Link className="font-semibold" to={'/about'}>
              About Us
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link className="font-semibold" to={'/explores'}>
              Explores
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex gap'>

      </div>
    </div>
  );
};

export default Navbar;
