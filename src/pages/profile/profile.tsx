import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { ProfileRoutes, ProfileRouteTypes } from '@lib/routes/profile-routes';
import MainLayout from '@pages/layout/main-layout';
import React, { Fragment, Suspense, useState } from 'react';
import ProtectedRoute from 'src/middleware/protected-route';

export default function Profile() {

    const [profileMenu, setProfileMenu] = useState<ProfileRouteTypes>(ProfileRoutes[0])


    return (
        <ProtectedRoute>
            <MainLayout className={"px-24 bg-slate-100 min-h-screen w-full flex justify-between items-start gap-4"}>
                <div className='w-screen h-screen  pt-28 pb-8 flex flex-col'>
                    <div className='mb-8'></div>
                    <div className='w-full h-28 py-4 flex flex-col gap-2'>
                        <h1 className='text-2xl font-medium '>{profileMenu.name}</h1>
                        <h1 className='text-base text-gray-400'>{profileMenu.description}</h1>
                        <Separator className='bg-gray-300'/>
                    </div>
                    <div className='w-full h-full flex gap-32 mt-4'>
                        <div className=' w-[25%] h-full flex flex-col gap-2'>
                            <div className='w-full h-fit flex flex-col gap-2 rounded-lg'>
                                {ProfileRoutes.map((menu, i)=>{
                                    return (
                                        <Button onClick={()=>{setProfileMenu(menu)}} variant={'ghost'} className={`hover:bg-primary justify-start text-base ${ profileMenu.name == menu.name? "bg-primary":"bg-transparent"}`}>
                                            {menu.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full h-full max-h-full'>
                                <Suspense fallback={<></>}>
                                    {profileMenu.element}
                                </Suspense>
                        </div>
                    </div>

                </div>
            </MainLayout>
        </ProtectedRoute>
    )
}
