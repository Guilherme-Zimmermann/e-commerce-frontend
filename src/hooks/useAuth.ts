import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext) || {
        user: null,
        signed: false,
        loading: true,
        signin: async () => {},
        signup: async () => {},
        singout: () => {}
    }

    return context
}