// Footer.jsx

import React, { useEffect, useState } from 'react';
import logoDark from '@assets/logo/logo-dark.png';
import { MdOutlineMail } from 'react-icons/md';
import { FaInstagram, FaRegCopyright } from 'react-icons/fa';
import FooterProfile from './footer-profile';

type props = {
    className? : string
}

export default function Footer({className = "bg-slate-100"} : props) {

    const [footerMode, setfooterMode] = useState("default");
    const [titleTransform, setTitleTransform] = useState(0);

    const subtitles = ["Blockchain", "Transparency", "Security", "Trust", "Technology"]
    const [activeSubtitle, setActiveSubtitle] = useState(subtitles[0])

    const handleScroll = async () => {
        // Current scroll position from the top
        const scrollTop = window.pageYOffset;
        // Total document height
        const docHeight = document.documentElement.scrollHeight;
        // Current window height
        const winHeight = window.innerHeight;
        // Distance to the bottom of the document
        const scrollBottom = docHeight - winHeight - scrollTop;

        if (scrollBottom < 100) {
            setfooterMode("bottom");
        } else {
            setfooterMode("default");
        }

        if (scrollBottom < 800) {
            setTitleTransform(-scrollBottom)
            let index = Math.floor(scrollBottom / 100) % subtitles.length;
            setActiveSubtitle(subtitles[index]);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <footer className={`w-full h-[85vh] transition-all duration-300 z-100 relative ${className} ${footerMode === "default" ? "px-16 pb-16" : "p-0"}`}>
        <div className={`w-full h-full bg-white transition-all duration-300 flex flex-col justify-between px-24 pt-24 pb-16 ${footerMode === "default" ? "rounded-3xl" : ""}`}>

            <div className='flex justify-between'>
                <div className='flex flex-col gap-8'>
                    <div className='w-96 overflow-hidden text-nowrap'>
                        <div className='text-7xl text-slate-700 font-medium flex gap-8' style={{transform: `translateX(${titleTransform}px)`}}>
                            <p>PhilanthroFi</p> <p>PhilanthroFi</p> <p>PhilanthroFi</p>
                        </div>
                    </div>
                    <div className='flex gap-1 text-xl'>
                        <p>Transforming</p>
                        <p className='bg-purple-200'>Charity</p>
                        <p>With</p>
                        <p className='bg-primary'>
                            {
                                activeSubtitle
                            }
                        </p>
                    </div>
                </div>

                <div className='flex gap-5'>
                    {/* <p className='text-2xl font-semibold'>Our Team</p> */}
                    <div className='flex flex-col gap-6 '>
                        <FooterProfile name='Darryl Effendi' github='Darryleffendi' />
                        <FooterProfile name='Victor Halim' github='victorhalimm' />
                        <FooterProfile name='Christopher Alden' github='christopher-alden' />
                        <FooterProfile name='Eldrian Giovanni' github='Deceive00' />
                        <FooterProfile name='Davis Kelvin' github='Daviskelvin824' />
                        
                    </div>
                </div>
            </div>

            <div className='border-t border-slate-300 pt-8 flex items-center justify-between'>
                <img src={logoDark} className="w-8 opacity-50"/>
                <div className='flex items-center gap-1 text-sm opacity-50'>
                    <FaRegCopyright className='text-xs' />
                    <p>Copyright</p>
                    <p>Team LCAS</p>
                </div>
            </div>
        </div>
    </footer>
  );
}
