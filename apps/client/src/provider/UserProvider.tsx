import { createContext } from "react";
import useAxios from "../hooks/useAxios";

interface InitialContextType {
    data: {
        username: string;
        email: string;
        _id: string;
    } | null,
    loading: boolean;
    error: Error | null;
    setData: any;
}

export const UserContext = createContext<InitialContextType>({
    data: null,
    loading: false,
    error: null,
    setData: () => { }
});

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const { data, loading, error, setData } = useAxios({ url: '/auth', method: 'get' });
    return (
        <UserContext.Provider value={{
            data,
            loading,
            error,
            setData
        }}>
            {children}
        </UserContext.Provider>
    );
}