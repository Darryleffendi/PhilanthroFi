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
import UserIcon from '@components/icons/user-icon'
import WalletButton from './wallet-button';

type props = {
  className?: string;
};

const Navbar = ({ className = 'bg-transparent' }: props) => {

    const [isScrolled, setScrolled] = useState<boolean>(false);
    const [showA, setShowA] = useState<boolean>(false);
    const [showB, setShowB] = useState<boolean>(false);
    const [showC, setShowC] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setShowA(isScrolled)
            await new Promise(r => setTimeout(r, 100))
            setShowB(isScrolled)
            await new Promise(r => setTimeout(r, 100))
            setShowC(isScrolled)
        })()
    }, [isScrolled])


  const scrolledStyle = 'bg-white rounded-lg'

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
    <div className="flex justify-between w-full">
      <NavigationMenu
        className={`px-6 py-6 h-20 absolute flex items-center gap-8 transition-all duration-300 justify-between ${isScrolled ? scrolledStyle : className}`}
      >
        <Link to={'/home'}>
          <div className="flex items-center gap-2">
            <img src={logoDark} className="object-cover h-10" alt="" />
            <div className={`text-3xl font-[500] overflow-hidden duration-500 ${isScrolled ? "w-0" : "w-40 "}`}>
              PhilanthroFi
            </div>
          </div>
        </Link>
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

        <div className={`w-9 h-9 bg-white hover:bg-slate-200 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${showB ? "opacity-0" : "opacity-100"}`} style={{transform: showC ? "translateX(250%)" : ""}}>
            <Link to='/profile'><UserIcon /></Link>
        </div>

          <div className={`transition-all duration-500 h-9 ${showC ? "opacity-0" : "opacity-100"}`} style={{transform: showC ? "translateX(50%)" : ""}}>
            <WalletButton />
          </div>
        </div>
    </div>
  );
};

export default Navbar;
