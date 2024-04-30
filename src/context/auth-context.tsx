import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "@lib/auth/auth-settings";
import { useService } from "@lib/hooks/useService";
import { AuthState, User, UserBase } from "@lib/types/user-types";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";


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
    const { getBackendService } = useService();

    
    const fetchUserData = useCallback(async ()=>{
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        const identity = authClient.getIdentity();
        if(await authClient.isAuthenticated()){
            setAuthState(AuthState.Loading)
            // refactor pake usequery
            const backend = await getBackendService()
            const userData =  await backend.getUser(identity.getPrincipal())
            console.log(userData)
            if (userData.length && userData!=null){
                setUser(userData[0])
                console.log("masuk auth")
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
        console.log(user)
    },[getBackendService]);


    const register = async (userRegisData: UserBase) =>{

        const backend = await getBackendService()
        const response = await backend.register(
            userRegisData.first_name, 
            userRegisData.last_name,
            userRegisData.email,
            userRegisData.birth_date
        )
        console.log(response)
        return response
    }

    const logout = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        await authClient.logout();
        console.log("Login Success", authClient.getIdentity().getPrincipal().toText())
        setUser(null);
        setAuthState(AuthState.Nope);

        // bikin middleware
    };

    const login = async () =>{
        try{
            const authClient = await AuthClient.create(defaultOptions.createOptions);
            await authClient.login(defaultOptions.loginOptions);

            console.log("Login Success", authClient.getIdentity())
            console.log("Login Success", authClient.getIdentity().getPrincipal().toText())
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