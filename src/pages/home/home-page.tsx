import MainLayout from '@pages/layout/main-layout';
import ProtectedRoute from 'src/middleware/protected-route';
import ICPLogo from '@assets/logo/icp.png';
import Logo from '@assets/logo/logo-dark.png';
import NumberColumn from './number-column';
import ProgressBar from '@components/progress_bar/progress-bar';
import CharityCard from './charity-card';
import { dummyCharity } from '@lib/types/charity-types';
import { useService } from '@lib/hooks/useService';
import { useEffect } from 'react';
import { Button } from '@components/ui/button';
import { useAuth } from '@lib/hooks/useAuth';
import { useWallet } from '@lib/hooks/useWallet';

const HomePage = () => {

  const {getCharityService} = useService();
  const {transfer,transferLoading, transferError} = useWallet();
  const { user } = useAuth();

  const getAllCharities = async () => {

    const charitiesService = await getCharityService();

    const charities = await charitiesService.getAllCharities([], []);

    //@ts-ignore
    // console.log(charities.ok);
  }

  useEffect(() => {
    getAllCharities()
  }, [])

  
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-200'}>
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

              <Button disabled={transferLoading} onClick={()=>{transfer({to:"c7d6k-43szk-23spb-xle2m-shnuh-6hyw4-2o5vs-nzbjt-xtyfb-r6lfq-qqe", amount:3000})}}>
                {transferLoading ? "Loading Cok" : `${transferError?.message || "Manta Button"}`}
              </Button>
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
              <CharityCard charity={dummyCharity} />
              <CharityCard charity={dummyCharity} />
              <CharityCard charity={dummyCharity} />
              <CharityCard charity={dummyCharity} />
              <CharityCard charity={dummyCharity} />
              <CharityCard charity={dummyCharity} />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
