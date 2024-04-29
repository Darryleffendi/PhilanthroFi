import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import {  RouterProvider, createBrowserRouter,Link } from "react-router-dom";

function App() {
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  return (
    <div className="App">
      <div className='text-blue-300'>Hello Silitonga</div>
      
      <Link to={'/authpage'}>
      
        <button>Login pantek</button>
      </Link>

      
    </div>
  );
}

export default App;
