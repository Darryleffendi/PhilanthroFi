import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/auth/auth-settings";
import { createContext, ReactNode, useState } from "react";
import { _SERVICE as _SERVICE_BACKEND } from "src/declarations/backend/backend.did";
import { canisterId as backendCanisterId, createActor as createBackendActor } from "src/declarations/backend";

interface ServiceContextProviderProps {
    children: ReactNode
}

export type ServiceContextType ={
    getBackendService: () =>Promise<ActorSubclass<_SERVICE_BACKEND>>;
}

export const ServiceContext = createContext<ServiceContextType>({
    getBackendService: null!
})

export default function ServiceContextProvider({children}:ServiceContextProviderProps){
    const [backendService, setBackendService] = useState<ActorSubclass<_SERVICE_BACKEND>>();
    const [agent, setAgent] = useState<HttpAgent>();

    const getHTTPAgent = async () =>{
        const authClient = await AuthClient.create(defaultOptions.createOptions)
        const identity = authClient.getIdentity();
        if(!agent){
            const agent = new HttpAgent({identity})
            setAgent(agent)
            return agent
        }
        return agent
    }

    const getBackendService = async () =>{
        if(!backendService){
            const agent = await getHTTPAgent()
            if (agent){
                const newBackendService = createBackendActor(backendCanisterId,{
                    agent,
                })
                if(backendService){
                    //@ts-ignore
                    setBackendService(newBackendService);
                    return newBackendService
                }
            }
        }
        return backendService
    }

    return (
        <ServiceContext.Provider
            value={{
                //@ts-ignore
                getBackendService: getBackendService!,
            }}>
            {children}
        </ServiceContext.Provider>
    );
}