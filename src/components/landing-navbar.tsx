import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';
import logoDark from '@assets/logo/logo-dark.png';
import { useEffect, useState } from 'react';

type props = {
  className?: string;
  navMode? : 'top' | 'default'
};

const LandingNavbar = ({ className, navMode }: props) => {

    let defaultNavClass = 'bg-white shadow-md rounded-lg h-16'
    let topNavClass = 'h-24 px-16 mt-4'

    const [navClass, setNavClass] = useState(navMode === 'top' ? topNavClass : defaultNavClass);

    useEffect(() => {
        setNavClass(navMode === 'top' ? topNavClass : defaultNavClass)
    }, [navMode])

  return (
    <div className={`px-6 py-4 flex justify-between fixed w-screen transition-all z-50 duration-500 ${className} ${navClass}`}>
      <NavigationMenu
        className={`flex items-center gap-12 justify-between`}
      >
        <div className="flex items-center gap-2 h-full">
          <img src={logoDark} className="object-cover h-full transition-all duration-500" alt="" />
          <div className="text-3xl font-[500] overflow-hidden">
            <p
                className='transition-all duration-700' 
                style={{transform: navMode === 'top' ? '' : 'translateX(-100%)'}}
            >
                PhilanthroFi
            </p>
          </div>
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
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap"></div>
    </div>
  );
};

export default LandingNavbar;
