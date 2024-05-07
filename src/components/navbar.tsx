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
};

const Navbar = ({ className = 'bg-slate-200' }: props) => {
  const [isScrolled, setScrolled] = useState<boolean>(false);

  const scrolledStyle = 'bg-white shadow-lg rounded-lg'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-between">
      <NavigationMenu
        className={`px-6 py-6 h-20 flex items-center gap-12 transition-all duration-300 justify-between ${isScrolled ? scrolledStyle : className}`}
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
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap"></div>
    </div>
  );
};

export default Navbar;
