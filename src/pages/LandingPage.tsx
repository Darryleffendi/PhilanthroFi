import { Button } from "@components/ui/button";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "@lib/hooks/useAuth";
import { useEffect, useState } from "react";


export default function LandingPage() {

  const {logout, user} = useAuth()
  const [navClass, setNavClass] = useState("")

  let scrollTop = 0;
    
  const handleScroll = async () => {
    scrollTop = window.pageYOffset;

    if(scrollTop >= 700) {
        setNavClass("bg-white rounded-lg shadow-lg")
    }
    else {
        setNavClass("")
    }
    console.log(scrollTop)
  }

  useEffect(() => {
    
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.cursor = '';
        }
    }, [])

  return (
    <MainLayout navbarClassName={navClass}>
        <div className="bg-white w-full p-6 h-screen z-20 flex justify-center"></div>
        <div className=' w-full h-screen flex flex-col gap-10'>
          Ini landing page, boleh siapa aja masuk, tapi home udah kena cockblock sama auth
          <div>
            User Data:
            <br/>
            {user?.email}
            <br/>
            {user?.first_name}
          </div>
          <Button onClick={()=>{logout()}} className="text-8xl">EMERGENCY LOGOUT PANTEK BUTTON </Button>
        </div>
    </MainLayout>
      
  );
}
