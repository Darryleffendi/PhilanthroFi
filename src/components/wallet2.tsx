import React, { useState } from 'react';
import PlugConnect from '@psychedelic/plug-connect';
import { useWallet } from '@lib/hooks/useWallet';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter
} from '@components/ui/alert-dialog'; 


export default function Wallet2() {
  const { isConnected, whitelist , getConnection, plugConnectOrCreateAgent} = useWallet();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConnect =  async () => {
    plugConnectOrCreateAgent();
    await getConnection()
    setDialogOpen(true); 
  };

  return (
    <>
      <PlugConnect
        dark={false}
        whitelist={[whitelist]}
        host="https://mainnet.dfinity.network"
        onConnectCallback={handleConnect}
      />
      <></>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <button style={{ display: "none" }}></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            {isConnected ? 
            "You Are Plugged In": "Something Went Wrong"}
            </AlertDialogTitle>
          <AlertDialogDescription>
            {isConnected ?
            "Your plug wallet has been successfully connected" : "Please try connecting to Plug again"}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => { setDialogOpen(false); }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
