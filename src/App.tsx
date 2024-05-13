import { router } from '@lib/routes/routes';
import './App.css';
import {  RouterProvider} from "react-router-dom";
import AuthContextProvider from './context/auth-context';
import ServiceContextProvider from './context/service-context';
import { Helmet } from 'react-helmet-async';
import SmoothScrollbar from '@components/smooth_scrollbar/smooth-scrollbar';
import { CookiesProvider } from 'react-cookie';


function App() {

  return (
    <div className='font-restart'>
      <Helmet>
        <title>PhilanthroFi</title>
        <link rel="icon" href="/assets/logo/logo-white.png" />
      </Helmet>

      {/* nanti ini context aja masukingnya */}
      <CookiesProvider>
        <ServiceContextProvider>
            <AuthContextProvider>
            <RouterProvider router={router} />
            </AuthContextProvider>
        </ServiceContextProvider>
      </CookiesProvider>
    </div>
  );
}

export default App;
