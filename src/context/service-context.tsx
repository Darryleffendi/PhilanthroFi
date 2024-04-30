import {  ActorSubclass, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { createContext, ReactNode, useState } from "react";
import { _SERVICE as _SERVICE_BACKEND } from "src/declarations/backend/backend.did";
import { canisterId as backendCanisterId, createActor as createBackendActor } from "src/declarations/backend";
import { fetchOptions,host } from "@lib/settings/agent-settings";


interface ServiceContextProviderProps {
    children: ReactNode
}

export type ServiceContextType ={
    getBackendService: () => Promise<ActorSubclass<_SERVICE_BACKEND>>;
}

export const ServiceContext = createContext<ServiceContextType>({
    getBackendService: null!
})

export default function ServiceContextProvider({children}:ServiceContextProviderProps){
    const [backendService, setBackendService] = useState<ActorSubclass<_SERVICE_BACKEND>>();
    const [agent, setAgent] = useState<HttpAgent|null>(null);

    const createHTTPAgent = async () =>{
        const authClient = await AuthClient.create(defaultOptions.createOptions)
        const identity = authClient.getIdentity();
        if(!agent){
            const agent = new HttpAgent({identity, fetchOptions, host})
            setAgent(agent)
            return agent
        }
        return agent
    }

    const getHTTPAgent = async () =>{
        if(!agent){
            const newAgent = await createHTTPAgent();
            setAgent(newAgent)
            return newAgent
        }
        return agent
    }

    const getBackendService = async () =>{
        if(!backendService){
            const a = await getHTTPAgent()
            if (a){
                const newBackendService = createBackendActor(backendCanisterId,{
                    agent:a
                })
                setBackendService(newBackendService);
                return newBackendService
            }
        }
        return backendService!
    }

    return (
        <ServiceContext.Provider
            value={{
                getBackendService: getBackendService,
            }}>
            {children}
        </ServiceContext.Provider>
    );
}