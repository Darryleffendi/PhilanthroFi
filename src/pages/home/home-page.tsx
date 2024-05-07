import MainLayout from '@pages/layout/main-layout';
import ProtectedRoute from 'src/middleware/protected-route';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-200'}>
        <div>
          Home
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
