import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/backend';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClientProvider,
} from 'react-query'
import { queryClient } from '@lib/settings/query-settings';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AgentProvider withProcessEnv>
        <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
          <QueryClientProvider client={queryClient}>
            <App/>
            </QueryClientProvider>
        </ActorProvider>
      </AgentProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
