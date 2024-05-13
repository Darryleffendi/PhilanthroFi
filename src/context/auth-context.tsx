import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { useService } from "@lib/hooks/useService";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { queryClient } from '@lib/settings/query-settings';
import { emit } from "process";
import { useCookies } from "react-cookie";

interface AuthContextProviderProps {
    children: ReactNode;
}

export type AuthContextType = {
    user: User | null;
    authState: AuthState;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    register: (userRegisData: UserBase) => Promise<any>;
    adminLogin: (email:string, password:string)=> Promise<boolean>;
    adminLogout: () => Promise<any>;
    getAdmin: ()=>User|null;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authState: AuthState.Nope,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    adminLogin: async () => false,
    adminLogout: async ()=>{},
    getAdmin: ()=>null,
    isLoading: false,
});


export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>(AuthState.Nope);
    const { getBackendService } = useService();
    const [cookies, setCookie, removeCookie] = useCookies(['ph1l4ntr0F1']);
    


    const authClient = async () => {
        const client = await AuthClient.create(defaultOptions.createOptions);
        return client
    };

    const login = async () => {
        try {
            //tolong
            const client = await authClient()
            if (client) {
                await new Promise<void>((resolve, reject) => {
                    client.login({...defaultOptions.loginOptions, onSuccess:()=>{
                        resolve()
                        queryClient.invalidateQueries(['userData']);
                    },})
                });
                
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error; 
        }
    };

    const logout = async () => {
        return new Promise<void>((resolve, reject) => {
            authClient().then(client => {
                client.logout().then(() => {
                    setUser(null);
                    setAuthState(AuthState.Nope);
                    queryClient.invalidateQueries(['userData']);
                    resolve(); 
                }).catch(logoutError => {
                    console.error("Error logging out:", logoutError);
                    reject(logoutError); 
                });
            }).catch(clientError => {
                console.error("Error obtaining auth client:", clientError);
                reject(clientError);
            });
        });
    };
    

    
    const register = async (userRegisData: UserBase) => {
        const client = await authClient()
        if(!await client.isAuthenticated())throw new Error("Not authenticated")
        try {
            const backend = await getBackendService()
            const response = await backend.register(
                userRegisData.first_name,
                userRegisData.last_name,
                userRegisData.email,
                userRegisData.birth_date
            );
            return response;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    };

    const { isLoading } = useQuery(['userData'], async () => {
        const client =  await authClient();
        if (!await client.isAuthenticated() || client.getIdentity().getPrincipal().isAnonymous()) {
            throw new Error('User is not authenticated');
        }

        const backend = await getBackendService();
        if (!backend) throw new Error('Backend service is not available');
        try{
            const userData = await backend.getUser(client.getIdentity().getPrincipal());
            if (!userData.length) throw new Error('No user data found');
            return userData[0];
        }
        catch(error:any){
            throw error
        }
        
    }, {
        retry: false,
        staleTime:0,
        onSuccess: (userData) => {
            setUser(userData);
            setAuthState(AuthState.Authenticated);
        },
        onError: (error:Error) => {
            console.error("Error fetching user data:", error.message);
            setAuthState(error.message === 'No user data found' ? AuthState.NotRegistered : AuthState.Nope);
        }
    });

    const adminLogin = async (email:string, password:string) =>{
        const backend = await getBackendService();
        if(!backend) throw new Error("Backend service is not availbale")

        const MAXTTL = 86400;

        try{
            const valid = await backend.adminLogin(email, password)
            //@ts-ignore
            if(valid.err){
                throw new Error("Not admin")
            }
            else{
                const transformedData ={
                    //@ts-ignore
                    ...valid.ok,
                    timestamp:0
                }

                setCookie('ph1l4ntr0F1',transformedData, {path:'/ph1l4ntr0F1', maxAge:MAXTTL})
                //@ts-ignore
                return valid.ok //user with no bigint
            }
            
        }catch(error){
            throw error
        }
    }

    const adminLogout = async () =>{
        removeCookie('ph1l4ntr0F1',{path:'/ph1l4ntr0F1'})
    }

    const getAdmin = () =>{
        return cookies.ph1l4ntr0F1;
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            user,
            authState,
            login,
            logout,
            adminLogin,
            adminLogout,
            getAdmin,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}
