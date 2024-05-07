import React, { useEffect } from 'react';
import PlugConnect from '@psychedelic/plug-connect';
export default function Wallet2() {
  // const verifyConnectionAndAgent = async () => {
  //   // const connected = await window.ic.plug.isConnected();
  //   // if (!connected) window.ic.plug.requestConnect({ whitelist, host });
  //   // if (connected && !window.ic.plug.agent) {
  //   //   window.ic.plug.createAgent({ whitelist, host });
  //   // }
  // };

  // useEffect(() => {
  //   verifyConnectionAndAgent();
  // }, []);

  const handleConnectWallet = async () => {
    const whitelist = 'https://mainnet.dfinity.network';
    const host = 'https://mainnet.dfinity.network';

    console.log('Ke konek abangkuhhh');
    console.log(window.ic.plug.agent.getPrincipal());
    console.log(window.ic.plug.isConnected());
    window.ic.plug.createAgent({ whitelist, host });
    const publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
    console.log(window.ic.plug.sessionManager.sessionData);
    const result = await window.ic.plug.requestBalance();
    console.log(result);
  };
  const verifyConnectionAndAgent = async () => {
    const whitelist = 'https://mainnet.dfinity.network';
    const host = 'https://mainnet.dfinity.network';
    const connected = await window.ic.plug.isConnected();
    if (!connected) window.ic.plug.requestConnect({ whitelist, host });
    if (connected && !window.ic.plug.agent) {
      window.ic.plug.createAgent({ whitelist, host });
    }
  };

  useEffect(() => {
    verifyConnectionAndAgent();
  }, []);

  return (
    <PlugConnect
      dark
      whitelist={['rdmx6-jaaaa-aaaaa-aaadq-cai']}
      host="https://mainnet.dfinity.network"
      onConnectCallback={handleConnectWallet}
    />
  );
}
