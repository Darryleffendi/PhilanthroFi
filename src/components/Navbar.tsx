import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import logoDark from "@assets/logo-dark.png"

const Navbar = () => {
  return (
    <NavigationMenu className="w-full px-12 py-5 h-20">
      <div className="flex items-center gap-3">
        <img src={logoDark} className='object-cover h-10' alt="" />
        <div className='text-3xl font-semibold'>PhilanthroFi</div>
      </div>
      <NavigationMenuList>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
