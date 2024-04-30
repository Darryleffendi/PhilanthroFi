import AuthPage from '@pages/auth/AuthPage';
import CompleteRegistration from '@pages/CompleteRegistration';
import HomePage from '@pages/home/HomePage';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
const LandingPage = React.lazy(() => import('@pages/LandingPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/complete-registration',
    element: <CompleteRegistration />,
  },
  {
    path: '/auth',
    element: <AuthPage/>
  },
  {
    path: '/home',
    element: <HomePage/>
  }
]);
