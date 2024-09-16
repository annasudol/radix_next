import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RadixDappToolkit, RadixNetwork } from '@radixdlt/radix-dapp-toolkit';
import App from './App.tsx';
import { Provider } from './provider.tsx';
import '@/styles/globals.css';
import { RdtProvider } from './context/RdtProvider.js';
import { GatewayApiProvider } from './context/GatewayApiProvider';
import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk';

export const componentAddress = 'component_tdx_2_1cz44jlxyv0wtu2cj7vrul0eh8jpcfv3ce6ptsnat5guwrdlhfpyydn';

// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata
// then use that account for your dAppDefinitionAddress
export const dAppDefinitionAddress = 'account_tdx_2_12y7ue9sslrkpywpgqyu3nj8cut0uu5arpr7qyalz7y9j7j5q4ayhv6';

// Instantiate Radix Dapp Toolkit for connect button and wallet usage.
const rdt = RadixDappToolkit({
  networkId: RadixNetwork.Stokenet,
  applicationVersion: '1.0.0',
  applicationName: 'Hello Token dApp',
  applicationDappDefinitionAddress: dAppDefinitionAddress,
});
console.log('dApp Toolkit: ', rdt);
// Instantiate Gateway API for network queries
const gatewayApi = GatewayApiClient.initialize(rdt.gatewayApi.clientConfig);
console.log('gatewayApi: ', gatewayApi);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RdtProvider value={rdt}>
      <GatewayApiProvider value={gatewayApi}>
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </GatewayApiProvider>
    </RdtProvider>
  </React.StrictMode>,
);
