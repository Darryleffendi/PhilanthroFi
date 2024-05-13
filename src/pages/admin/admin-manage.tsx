import { useAuth } from '@lib/hooks/useAuth';
import React, { Suspense, useState } from 'react'
import AdminProtectedRoute from 'src/middleware/admin-protected-route';
import logoDark from '@assets/logo/logo-dark.png';
import { AdminRoutes } from '@lib/routes/admin-routes';
import { RouteTypes } from '@lib/routes/profile-routes';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';


export default function AdminManage() {
  const {adminLogout} = useAuth();
  const [adminMenu, setAdminMenu] = useState<RouteTypes>(AdminRoutes[0])

  return (
    <AdminProtectedRoute>
      <div className='bg-slate-100 w-screen h-screen flex-col flex'>
        <div className='w-full h-20 p-6 fixed'>
          <div className="flex items-center gap-2 px-6 py-6">
              <img src={logoDark} className="object-cover h-10" alt="" />
              <div className={`text-3xl font-[500] overflow-hidden duration-500 `}>
                PhilanthroFi
              </div>
          </div>
        </div>


        <div className='px-24 pt-28 pb-8 h-full w-full flex flex-col'>
          <div className='mb-8'/>
          <div className='w-full h-28 py-4 flex flex-col gap-2'>
              <h1 className='text-2xl font-medium '>{adminMenu.name}</h1>
              <h1 className='text-base text-gray-400'>{adminMenu.description}</h1>
              <Separator className='bg-gray-300'/>
          </div>
          <div className='w-full h-full flex gap-32 mt-4'>
            <div className='w-[25%] h-full flex flex-col justify-between'>
                <div className='w-full h-fit flex flex-col gap-2 bg-red-200'>
                  {AdminRoutes.map((menu)=>{
                    return(
                      <Button onClick={()=>{setAdminMenu(menu)}} variant={'ghost'} className={`hover:bg-primary w-full justify-start text-base ${ adminMenu.name == menu.name? "bg-primary":"bg-transparent"}`}>
                          {menu.name}
                      </Button>
                    )
                  })}
                </div>

                <div className='w-full h-fit'>
                    <Button onClick={()=>{adminLogout();window.location.reload()}} className='bg-transaparent w-full justify-start text-base hover:bg-red-200' variant={'ghost'}>Logout</Button>
                </div>
            </div>

            <div className='w-full h-full max-h-full'>
                    <Suspense fallback={<></>}>
                        {adminMenu.element}
                    </Suspense>
            </div>
          </div>
          
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
