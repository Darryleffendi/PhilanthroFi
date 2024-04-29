import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/backend';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './auth/Auth';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/authpage",
    element:<Auth/>
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
        <RouterProvider router={router} />
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
