import { Button } from "@components/ui/button";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "@lib/hooks/useAuth";


export default function LandingPage() {

  const {logout, user} = useAuth()
  return (
    <MainLayout>
        <div className=' w-full h-full flex flex-col gap-10'>
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
