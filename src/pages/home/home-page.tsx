import MainLayout from '@pages/layout/main-layout';
import ProtectedRoute from 'src/middleware/protected-route';
import AnimatedNumbers from "react-animated-numbers";

const HomePage = () => {
  
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-200'}>
        <div className='w-full h-full'>
          <div className='p-6 absolute bottom-0 flex flex-col w-full'>
            <div className='text-7xl font-medium text-indigo-400'>Total Fund's Raised</div>
            <div className='flex text-[10rem] font-medium'>
              $
              <AnimatedNumbers 
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index,
              })}
              animateToNumber={98213731}
              >
              </AnimatedNumbers>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
