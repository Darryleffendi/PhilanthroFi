


export const plugConnectOrCreateAgent = async (whitelist) => {
    const host = 'https://mainnet.dfinity.network';
    const connected = await window.ic?.plug?.isConnected();
    if (!connected) window.ic?.plug?.requestConnect({ whitelist, host });
    if (connected && !window.ic.plug.agent) {
      window.ic?.plug?.createAgent({ whitelist, host });
    }
};

export const getPlugBalance = async () => {
  const balance = await window.ic?.plug?.requestBalance();
  return balance
}

export const getConnectionStatus = async () => {
  const response = await window.ic?.plug?.isConnected();
  return response
}

export const requestTransfer = async (to, amount) => {

  const requestTransferArg = {
    to,
    amount
  };    
  const response = await window.ic?.plug?.requestTransfer(requestTransferArg);
  return response
}