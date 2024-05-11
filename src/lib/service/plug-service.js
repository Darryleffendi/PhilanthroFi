
import { Principal } from "@dfinity/principal";


export const XTC_CANISTER_ID = "aanaa-xaaaa-aaaah-aaeiq-cai"


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
  console.log(response)
  return response
}

// dah hanya Tuhan dan Plug yang tau caranya bgst ni
// const TRANSFER_XTC_TX = {
//   // idl??
//   canisterId: XTC_CANISTER_ID,
//   methodName: 'transfer',
//   args: [{ to: Principal.fromText('byj7a-cglbt-z3aor-vuggh-7kayt-6ld7z-x4sla-evezh-gw4ka-jl4ta-iqe'), amount: BigInt(1400000), from: [] }],
//   onSuccess: async (res) => {
//     console.log('transferred xtc successfully');
//   },
//   onFail: (res) => {
//     console.log('transfer xtc error', res);
//   },
// };
// export const transferXtcTx = async () =>{
//     const params = {
//       to: "byj7a-cglbt-z3aor-vuggh-7kayt-6ld7z-x4sla-evezh-gw4ka-jl4ta-iqe",
//       amount: 1_000_000_000
//     }
    
//     const res = await window.ic.plug.batchTransactions([TRANSFER_XTC_TX])
//     console.log(res)
// }