import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";


const AuthContext = createContext()

// public pages - public routes
// protected pages - protected routes

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get("/users/me").then((res) => {
            console.log(res.data.userData)
            setUser(res.data.userData)
        }).catch((err) => {
            console.log(err)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>

            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
