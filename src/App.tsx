import { router } from '@lib/routes/route';
import './App.css';
import {  RouterProvider} from "react-router-dom";
import AuthContextProvider from './context/auth-context';
import ServiceContextProvider from './context/service-context';
import { Helmet } from 'react-helmet-async';

function App() {

  return (
    <>
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
    </>
  );
}

export default App;
