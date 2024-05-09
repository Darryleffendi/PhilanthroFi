import {  ActorSubclass, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { createContext, ReactNode, useState } from "react";
import { _SERVICE as _SERVICE_BACKEND } from "src/declarations/backend/backend.did";
import { _SERVICE as _SERVICE_CHARITY } from "src/declarations/charity/charity.did";
import { canisterId as backendCanisterId, createActor as createBackendActor } from "src/declarations/backend";
import { canisterId as charityCanisterId, createActor as createCharityActor } from "src/declarations/charity";


interface ServiceContextProviderProps {
    children: ReactNode
}

export type ServiceContextType ={
    getBackendService: () => Promise<ActorSubclass<_SERVICE_BACKEND>>;
    getCharityService: () => Promise<ActorSubclass<_SERVICE_CHARITY>>;
}

export const ServiceContext = createContext<ServiceContextType>({
    getBackendService: null!,
    getCharityService: null!
})

export default function ServiceContextProvider({children}:ServiceContextProviderProps){
    const [backendService, setBackendService] = useState<ActorSubclass<_SERVICE_BACKEND>>();
    const [charityService, setCharityService] = useState<ActorSubclass<_SERVICE_CHARITY>>();
    const [agent, setAgent] = useState<HttpAgent|null>(null);

    const createHTTPAgent = async () =>{
        const authClient = await AuthClient.create(defaultOptions.createOptions)
        const identity = authClient.getIdentity();
        if(!agent){
            const agent = new HttpAgent({identity})
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

    const getCharityService = async () =>{
        if(!charityService){
            const a = await getHTTPAgent()
            if (a){
                const newCharityService = createCharityActor(charityCanisterId,{
                    agent:a
                })
                setCharityService(newCharityService);
                return newCharityService
            }
        }
        return charityService!
    }

    return (
        <ServiceContext.Provider
            value={{
                getBackendService: getBackendService,
                getCharityService: getCharityService
            }}>
            {children}
        </ServiceContext.Provider>
    );
}