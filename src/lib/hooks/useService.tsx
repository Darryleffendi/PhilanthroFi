import { useContext } from "react";
import { ServiceContext, ServiceContextType } from "src/context/service-context";

export const useService : () => ServiceContextType = () => useContext(ServiceContext)