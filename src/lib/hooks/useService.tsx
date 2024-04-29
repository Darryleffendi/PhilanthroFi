import { useContext } from "react";
import { ServiceContext } from "src/context/service-context";

export const useService = () => useContext(ServiceContext)