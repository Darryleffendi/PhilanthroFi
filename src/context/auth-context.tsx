import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { useService } from "@lib/hooks/useService";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { queryClient } from '@lib/settings/query-settings';

interface AuthContextProviderProps {
    children: ReactNode;
}

export type AuthContextType = {
    user: User | null;
    authState: AuthState;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    register: (userRegisData: UserBase) => Promise<any>;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authState: AuthState.Nope,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    isLoading: false,
});


export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>(AuthState.Nope);
    const { getBackendService } = useService();


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

    const logout = () => {
        return new Promise<void>((resolve, reject) => {
            authClient().then(client => {
                client.logout().then(() => {
                    setUser(null);
                    setAuthState(AuthState.Nope);
                    queryClient.invalidateQueries(['userData']);
                    resolve(); 
                    window.location.reload()
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

    // const fetchUserData = async () => {
    //     if(!authClient)return
    //     console.log("user:", user)
    //     console.log("authclient auth state", await authClient.isAuthenticated());
    //     console.log("actual auth state", authState)
        
    //     const backend = await getBackendService();
    //     const identity = authClient.getIdentity();
    //     if (!await authClient.isAuthenticated() || identity.getPrincipal().isAnonymous()) {
    //         throw new Error('User is not authenticated');
    //     }
    //     if (!backend) {
    //         throw new Error('Backend service is not available');
    //     }
    //     const userData = await backend.getUser(identity.getPrincipal());
    //     if (!userData.length) {
    //         throw new Error('No user data found');
    //     }

    //     return userData[0]; 
    // };



    // const { error, isLoading, isSuccess } = useQuery(['userData', authClient?.getIdentity()], fetchUserData, {
    //     retry: false,
    //     staleTime:0,
    //     onSuccess: (userData:User) => {
    //         setUser(userData);
    //         setAuthState(AuthState.Authenticated);
    //     },
    //     onError: (error:Error) => {
    //         console.error("Error fetching user data:", error.message);
    //         if (error.message === 'No user data found') {
    //             setAuthState(AuthState.NotRegistered);
    //         } 
    //         else {
    //             setAuthState(AuthState.Nope);
    //         }
    //     }
    // });

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

    return (
        <AuthContext.Provider value={{
            isLoading,
            user,
            authState,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}
