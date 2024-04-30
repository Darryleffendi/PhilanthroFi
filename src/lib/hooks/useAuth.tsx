import { useContext } from "react";
import { AuthContext, AuthContextType } from "src/context/auth-context";

export const useAuth : () => AuthContextType = () => useContext(AuthContext)