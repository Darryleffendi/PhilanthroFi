import { router } from '@lib/routes/route';
import './App.css';
import {  RouterProvider} from "react-router-dom";
import AuthContextProvider from './context/auth-context';

function App() {

  return (
    <div >
      {/* nanti ini context aja masukingnya */}
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
