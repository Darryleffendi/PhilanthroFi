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

    let defaultNavClass = 'h-16 px-8 '
    let topNavClass = 'h-24 px-16 mt-4'

    const [navClass, setNavClass] = useState(navMode === 'top' ? topNavClass : defaultNavClass);

    useEffect(() => {
        setNavClass(navMode === 'top' ? topNavClass : defaultNavClass)
    }, [navMode])

  return (
    <div className={`py-4 flex justify-between fixed w-screen transition-all z-50 duration-500 ${className} ${navClass}`}>
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

        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link className="" to={'/home'}>
              Start Donating
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link className="" to={'/explores'}>
              Explore
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap"></div>
    </div>
  );
};

export default LandingNavbar;
