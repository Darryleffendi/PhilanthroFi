import MainLayout from '@pages/layout/MainLayout';
import ProtectedRoute from 'src/middleware/protected-route';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <MainLayout className={'bg-slate-200'}>
        <div></div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
