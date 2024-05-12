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
import CharityCard from '@components/charity/charity-card';
import SeedCharity from '@lib/utils/seed-charity';

const HomePage = () => {
  

  const {getCharityService} = useService();
  const {transfer,transferLoading, transferError} = useWallet();
  const [featuredCharities, setFeaturesCharities] = useState<BackendCharityEvent[]>([]);


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
              <div className="text-lg font-normal text-black">
                By harnessing blockchain technology, PhilanthroFi has built a
                formidable reputation for ensuring that funds are allocated
                exactly as intended, enhancing trust through unparalleled
                transparency and technological innovation.
              </div>
              
              <Button disabled={transferLoading} onClick={()=>{transfer({to:"byj7a-cglbt-z3aor-vuggh-7kayt-6ld7z-x4sla-evezh-gw4ka-jl4ta-iqe", amount:3000})}}>
                {transferLoading ? "Loading Cok" : `${transferError?.message || "Manta Button"}`}
              </Button>
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
        <div className="w-full min-h-screen">
          <div className="p-16 flex flex-col gap-8">
            <div className="text-indigo-400 font-semibold text-xl">
              Featured Charities
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
