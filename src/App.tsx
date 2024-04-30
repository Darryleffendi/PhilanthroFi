import { router } from '@lib/routes/route';
import './App.css';
import {  RouterProvider} from "react-router-dom";
import AuthContextProvider from './context/auth-context';
import ServiceContextProvider from './context/service-context';
import { Helmet } from 'react-helmet-async';


function App() {

  return (
    <div className='font-restart'>
      <Helmet>
        <title>PhilantroFi</title>
        <link rel="icon" type="image/svg+xml" href="" />
      </Helmet>

      {/* nanti ini context aja masukingnya */}
      <ServiceContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </ServiceContextProvider>
    </div>
  );
}

export default App;
