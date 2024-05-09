// AuthContextProvider.js

import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { useService } from "@lib/hooks/useService";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";

interface AuthContextProviderProps {
    children: ReactNode;
}

export type AuthContextType = {
    user: User | null;
    authState: AuthState;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    register: (userRegisData: UserBase) => Promise<any>;
    getIdentity: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authState: AuthState.Nope,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(),
});

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>(AuthState.Nope);
    const { getBackendService } = useService();
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);

    useEffect(() => {
        const initializeAuthClient = async () => {
            const client = await AuthClient.create(defaultOptions.createOptions);
            setAuthClient(client);
            if (await client.isAuthenticated()) {
                fetchUserData();
            } else {
                setAuthState(AuthState.Nope);
            }
        };

        initializeAuthClient();
    }, []);

    const fetchUserData = async () => {
        if(!authClient)return
        
        const identity = authClient.getIdentity();
        if (!identity || identity.getPrincipal().isAnonymous()) {
            throw new Error('User is not authenticated');
        }

        const backend = await getBackendService();
        if (!backend) {
            throw new Error('Backend service is not available');
        }

        const userData = await backend.getUser(identity.getPrincipal());
        if (!userData || userData.length === 0) {
            throw new Error('No user data found');
        }

        console.log(userData)
        return userData[0]; 
    };

    const { error, isLoading, isSuccess } = useQuery(['userData', authClient?.getIdentity()], fetchUserData, {
        retry: false,
        onSuccess: (userData:User) => {
            setUser(userData);
            setAuthState(AuthState.Authenticated);
        },
        onError: (error:Error) => {
            console.error("Error fetching user data:", error);
            if (error.message === 'No user data found') {
                setAuthState(AuthState.NotRegistered);
            } 
            else {
                setAuthState(AuthState.Nope);
            }
        }
    });

    const register = async (userRegisData: UserBase) => {
        try {
            const backend = await getBackendService();
            const response = await backend.register(
                userRegisData.first_name,
                userRegisData.last_name,
                userRegisData.email,
                userRegisData.birth_date
            );
            console.log(response)
            return response;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    };

    const login = async () => {
        try {
            if (authClient) {
                await new Promise((resolve, reject) => {
                    authClient.login({...defaultOptions.loginOptions, onSuccess:resolve,})
                });
                
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error; 
        }
    };
    

    const logout = async () => {
        try {
            if (authClient) {
                await authClient.logout();
                setUser(null);
                setAuthState(AuthState.Nope);
            }
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    };

    const getIdentity = async () => {
        try {
            if (authClient) {
                return authClient.getIdentity().getPrincipal();
            }
            return null;
        } catch (error) {
            console.error("Error getting identity:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authState,
                login,
                logout,
                register,
                getIdentity,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
