import MainLayout from '@pages/layout/main-layout';
import ProtectedRoute from 'src/middleware/protected-route';
import AnimatedNumbers from 'react-animated-numbers';
import LineSeparator from '@components/line-separator';
import Logo from '@assets/logo/logo-dark.png';
import NumberColumn from './number-column';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-200'}>
        <div className="w-full min-h-screen flex">
          <div className="p-24 mt-32 flex w-full justify-between">
            <div className="flex flex-col gap-3 basis-1/4">
              <div className="text-4xl font-medium text-black">
                Trust Through Transparency
              </div>
              <div className="text-lg font-normal text-black">
                By harnessing blockchain technology, PhilanthroFi has built a
                formidable reputation for ensuring that funds are allocated
                exactly as intended, enhancing trust through unparalleled
                transparency and technological innovation.
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <NumberColumn
                type="money"
                metrics="M"
                desc="funds raised"
                number={23}
              />
              <NumberColumn
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg h-[60vh]">
                <div className='w-full h-[45%]'>
                  <img src={Logo} alt="" className='object-cover w-full h-full' />
                </div>
                <div className='p-4 w-2/3 flex flex-col gap-4'>
                  <div className='text-xl font-medium'>Save a Child from DuckCing</div>
                  <div className='flex gap-3'>
                    <div className='rounded-xl text-blue-800 border border-blue-800 bg-blue-200 text-xs inline-block font-medium px-4 py-1'>Child Awareness</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
