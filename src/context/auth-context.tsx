// AuthContextProvider.js

import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/settings/auth-settings";
import { useService } from "@lib/hooks/useService";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { createContext, ReactNode, useEffect, useState } from "react";


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
                fetchUserData(client);
            } else {
                setAuthState(AuthState.Nope);
            }
        };

        initializeAuthClient();
    }, []);

    const fetchUserData = async (client: AuthClient) => {
        const identity = client.getIdentity();
        if (identity && !identity.getPrincipal().isAnonymous()) {
            try {
                setAuthState(AuthState.Loading);
                const backend = await getBackendService();
                const userData = await backend.getUser(identity.getPrincipal());
                if (userData.length && userData != null) {
                    setUser(userData[0]);
                    setAuthState(AuthState.Authenticated);
                } else {
                    setAuthState(AuthState.NotRegistered);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

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
                await authClient.login(defaultOptions.loginOptions);
                await fetchUserData(authClient);
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
