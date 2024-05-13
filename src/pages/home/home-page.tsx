import MainLayout from '@pages/layout/main-layout';
import ProtectedRoute from 'src/middleware/protected-route';
import ICPLogo from '@assets/logo/icp.png';
import Logo from '@assets/logo/logo-dark.png';
import NumberColumn from './number-column';
import ProgressBar from '@components/progress_bar/progress-bar';
import { useService } from '@lib/hooks/useService';
import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { useAuth } from '@lib/hooks/useAuth';
import { useWallet } from '@lib/hooks/useWallet';
import { useQuery } from 'react-query';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';
import {CharityCard} from '@components/charity/charity-card';
import SeedCharity from '@lib/utils/seed-charity';

const HomePage = () => {
  

  const {getCharityService} = useService();
  const {transfer,transferLoading, transferError} = useWallet();

  const [featuredCharities, setFeaturesCharities] = useState<BackendCharityEvent[]>([]);
  const [topCharity, setTopCharity] = useState<BackendCharityEvent>();


  const { user } = useAuth();
  
  const getAllCharities = async () => {
    const charityService = await getCharityService();
    return await charityService.getAllCharities([], [], []);
  }
  
  const { error, isLoading, isSuccess } = useQuery(['getAllCharities'], getAllCharities, {
    retry: false,
    onSuccess: (charity:BackendCharityEvent[]) => {
      // @ts-ignore emg asu ni motoko
      setFeaturesCharities([...charity.ok])
      // @ts-ignore
      setTopCharity(charity.ok[0])
    },
    onError: (error:Error) => {
      console.error("Error while fetching charity", error)
    }
});


  if(isLoading)return null
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-100'}>
        <div className="w-full min-h-screen flex">
          <div className="p-24 mt-32 flex w-full justify-between">
            <div className="flex flex-col gap-3 basis-1/3">
              <div className="text-4xl font-medium text-black">
                Trust Through Transparency
              </div>
              <div className="text-xl font-light text-black">
                By harnessing blockchain technology, PhilanthroFi has built a
                formidable reputation for ensuring that funds are allocated
                exactly as intended, enhancing trust through unparalleled
                transparency and technological innovation.
              </div>
              
              {/* <Button disabled={transferLoading} onClick={()=>{transferXtcTx()}}>
                {transferLoading ? "Loading Cok" : `${transferError?.message || "Manta Button"}`}
              </Button> */}
              
            </div>
            <div className="flex flex-col gap-10">
              <NumberColumn
                descStyle='text-end'
                type="money"
                metrics="M"
                desc="funds raised"
                number={23}
              />
              <NumberColumn
                descStyle='text-end'
                type="number"
                metrics="+"
                desc="charities held"
                number={421}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex gap-4 flex-col p-24 min-h-[70vh]'>
          <div className='text-7xl font-medium'>
          Almost there—help us succeed!
          </div>
          <div className='flex justify-end'>
              <div className='p-8 justify-end flex gap-6 max-w-[50%] min-h-[55vh] rounded-xl'>
                {
                   topCharity && 
                   (
                    <div className='flex flex-col'>
                      <div className='font-medium text-5xl'>#1</div>
                      <CharityCard charity={topCharity}></CharityCard>
                    </div>
                   )
                }
                {
                   topCharity && 
                   <div className='flex flex-col'>
                      <div className='font-medium text-5xl'>#2</div>
                     <CharityCard charity={topCharity}></CharityCard>
                   </div>
                }
              </div>
          </div>
        </div>
        <div className="w-full min-h-screen">
          <div className="p-24 flex flex-col gap-8">
            <div className="text-indigo-400 font-semibold tracking-wider text-2xl">
              FEATURED CHARITIES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {featuredCharities.map((charity, i)=>{
                return(
                  (
                    <CharityCard charity={charity} key={i}></CharityCard>
                  )
                )
              })}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
