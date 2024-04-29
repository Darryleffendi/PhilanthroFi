import { router } from '@lib/routes/route';
import './App.css';
import {  RouterProvider} from "react-router-dom";
import AuthContextProvider from './context/auth-context';
import ServiceContextProvider from './context/service-context';

function App() {

  return (
    <div >
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
