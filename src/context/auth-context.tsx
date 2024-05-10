import React, { createContext, ReactNode, useEffect, useState } from "react";
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
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);

    console.log(authState)
    useEffect(() => {
        const initializeAuthClient = async () => {
            const client = await AuthClient.create(defaultOptions.createOptions);
            setAuthClient(client);
            setAuthState(await client.isAuthenticated() ? AuthState.Authenticated : AuthState.Nope);
        };
        initializeAuthClient();
    }, []);

    const fetchUserData = async () => {
        if (!authClient) {
            throw new Error('AuthClient is not initialized');
        }
        
        const identity = authClient.getIdentity();
        if (identity.getPrincipal().isAnonymous()) {
            throw new Error('User is not authenticated');
        }

        const backend = await getBackendService();
        const userData = await backend.getUser(identity.getPrincipal());
        if (!userData || userData.length === 0) {
            throw new Error('No user data found');
        }
        return userData[0];
    };

    const {isLoading} = useQuery(['userData',authClient?.getIdentity()], fetchUserData, {
        retry:false,
        enabled: authState === AuthState.Authenticated,
        onSuccess: (userData) => {
            setUser(userData);
        },
        onError: (error:Error) => {
            console.error("Error fetching user data:", error);
            setUser(null);
            (error.message === "No user data found") ? setAuthState(AuthState.NotRegistered) : setAuthState(AuthState.Nope)
        }
    });

    const login = async () => {
        if (!authClient) return;
        try {
            await authClient.login({
                ...defaultOptions.loginOptions,
                onSuccess: () => {
                    queryClient.invalidateQueries(['userData']);
                },
            });
        } catch (error) {
            console.error("Error logging in:", error);
            setAuthState(AuthState.Nope);
        }
    };

    const logout = async () => {
        if (!authClient) return;
        try {
            await authClient.logout();
            setUser(null);
            setAuthState(AuthState.Nope);
            queryClient.invalidateQueries(['userData']);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const register = async (userRegisData: UserBase) => {
        try {
            const backend = await getBackendService();
            const res = await backend.register(userRegisData.first_name, userRegisData.last_name, userRegisData.email, userRegisData.birth_date); 
            return res
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    };

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
