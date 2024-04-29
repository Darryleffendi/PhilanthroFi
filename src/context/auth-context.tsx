import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/auth/auth-settings";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { backend } from "src/declarations/backend";


interface AuthContextProviderProps{
    children: ReactNode
}

export type AuthContextType = {
    user : User | null;
    authState : AuthState
    login: ()=>Promise<any>
    logout: ()=>Promise<any>
    register: (userRegisData: UserBase) => Promise<any>
    getIdentity: () => Promise<any>
}


export const AuthContext = createContext<AuthContextType>({
    user: null,
    authState: AuthState.Nope,
    login: null!,
    logout: null!,
    register: null!,
    getIdentity: null!
    
})

export default function AuthContextProvider({children}:AuthContextProviderProps){
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>(AuthState.Nope)

    const fetchUserData = async ()=>{
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        const identity = authClient.getIdentity();

        if(await authClient.isAuthenticated){
            setAuthState(AuthState.Loading)
            // refactor pake usequery
            const userData =  await backend.getUser(identity.getPrincipal())

            if (userData.length){
                setUser(userData[0])
                setAuthState(AuthState.Authenticated)
            }
            else if(identity){
                setAuthState(AuthState.NotRegistered)
            }
        }
        else{
            setUser(null);
            setAuthState(AuthState.Nope)
        }
    }


    const register = async (userRegisData: UserBase) =>{
        
        const response = await backend.register(
            userRegisData.first_name, 
            userRegisData.last_name,
            userRegisData.email,
            userRegisData.birth_date
        )

        return response
    }

    const logout = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        await authClient.logout();
        setUser(null);
        setAuthState(AuthState.Nope);

        // bikin middleware
    };

    const login = async () =>{
        try{
            const authClient = await AuthClient.create(defaultOptions.createOptions);
            await authClient.login(defaultOptions.loginOptions);

            console.log("Login Success", authClient.getIdentity())
        }catch (error){
            console.log("Login Failed", error)
        }
    }


    const getIdentity = async ()=>{
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        return authClient.getIdentity().getPrincipal()
    }


    useEffect(() => {
        fetchUserData()
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                authState,
                login,
                logout,
                register,
                getIdentity,
            }}>
            {children}
        </AuthContext.Provider>
    );

}