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
import { navbarRoutes } from '@lib/routes/navbar-routes';
import Wallet2 from './wallet2';
import { FaUser } from "react-icons/fa";

type props = {
  className?: string;
};

const Navbar = ({ className = 'bg-transparent' }: props) => {
  const [isScrolled, setScrolled] = useState<boolean>(false);

  const scrolledStyle = 'bg-white shadow-lg rounded-lg'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    if(window.scrollY > 0) 

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };  
  }, []);

  return (
    <div className="flex justify-between w-screen">
      <NavigationMenu
        className={`px-6 py-6 h-20 absolute flex items-center gap-12 transition-all duration-300 justify-between ${isScrolled ? scrolledStyle : className}`}
      >
        <div className="flex items-center gap-2">
          <img src={logoDark} className="object-cover h-10" alt="" />
          <div className="text-3xl font-[500] transition-all duration-200 overflow-hidden">
            <p className=''>PhilanthroFi</p>
          </div>
        </div>

        <NavigationMenuList className="flex gap-2">
          {navbarRoutes.map((nav)=>{
            return(
              <NavigationMenuItem key={nav.link}>
                <Link className="" to={nav.link}>
                  {nav.name}
                </Link>
              </NavigationMenuItem>
            )
          })}
          <NavigationMenuItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div></div>

      <div className="flex gap-4 h-20 mr-12 items-center">
        <div className='w-10 h-10 flex items-center justify-center p-1 hover:p-0 transition-all duration-200'>
            <div className='w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer'>
                <FaUser />
            </div>
        </div>
        <Wallet2/>
        </div>
    </div>
  );
};

export default Navbar;
