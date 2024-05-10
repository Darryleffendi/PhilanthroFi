
import React from 'react';
import AuthPage from '@pages/auth/auth-page';
import HomePage from '@pages/home/home-page';
import { createBrowserRouter } from 'react-router-dom';
import FundraisePage from '@pages/fundraise/fundraise-page';
const LandingPage = React.lazy(() => import('@pages/landing-page'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthPage/>
  },
  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/fundraise',
    element: <FundraisePage />
  }
]);