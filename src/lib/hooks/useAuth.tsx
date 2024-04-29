import { useContext } from "react";
import { AuthContext } from "src/context/auth-context";

export const useAuth = () => useContext(AuthContext)