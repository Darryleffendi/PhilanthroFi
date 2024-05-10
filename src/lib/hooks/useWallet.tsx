import { useEffect, useState, useRef } from 'react';
import { getConnectionStatus, getPlugBalance, plugConnectOrCreateAgent, requestTransfer } from '@lib/service/plug-service';
import { canisterId as iiCanisterId } from 'src/declarations/internet_identity';
import { PlugBalance, TransferTransaction } from '@lib/types/wallet-types';
import { useMutation } from 'react-query';

export const useWallet = () => {
    // const [balance, setBalance] = useState<PlugBalance[]>([]);
    const isConnectedRef = useRef(false);
    const whitelist = iiCanisterId;

    const getConnection = async () => {
        try {
            const status = await getConnectionStatus()
            isConnectedRef.current = status
            return status
        } catch (error) {
            console.error("Failed to refresh connection status:", error);
        }
    };

    const { mutate: transfer, isLoading: transferLoading, error: transferError, isSuccess } = useMutation(
        async ({ to, amount }: TransferTransaction) => {
            
            if (!await getConnection()) throw new Error("Not plugged in");
            // const balances = await getPlugBalance();
            // if (balances[0]?.amount < amount) {
            //     throw new Error("Insufficient balance");
            // }
            if (!to) {
                throw new Error("Destination not defined");
            }
            return await requestTransfer(to, amount);
        }, {
        onError: (error: Error) => {
            console.error('Error during transfer:', error.message);
        },
        onSuccess: (data) => {
            console.log('Transfer successful:', data);
        }
    });

    return {
        isConnected: isConnectedRef.current,
        // balance,
        whitelist,
        getConnection,
        plugConnectOrCreateAgent,
        transfer,
        transferLoading,
        transferError,
    };
};
