import axios from "axios";
import { createContext, useEffect, useState } from "react";

const baseUrl = "http://localhost:8080"

export type AuthContextType = {
    user: User | null;
    signed: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => void;
  };
  
  export const AuthContext = createContext<AuthContextType | undefined>({
    user: null,
    signed: false,
    loading: true,
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {}
  });

export interface User {
    id?: string,
    name?: string,
    email: string,
    dateCreated?: string,
    role?: string,
    password: string,
}

export const AuthProvider = ({ children }: any) => {
    const [ user, setUser ] = useState<User | null>(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")
        if (userToken) {
            async function fetchUser() {
                const response = await axios.get(baseUrl+"/api/user/me", {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                })
            
                if (response.data) {
                    setUser(response.data)
                } else {
                    console.log("Deu erro ao entrar")
                }
                setLoading(false)
            }
            
            fetchUser()
        } else {
            console.log("Usuário não está logado")
            setLoading(false)
        }
    }, [])

    const signIn = async ( email: string, password: string ) => {
        try {
            const response = await axios.post(baseUrl+"/auth/login", {email, password})

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("user_token", token)

                const instant = new Date().getTime()
                localStorage.setItem("token_life_time", instant.toString())

                setInterval(() => {
                    const tokenLifeTime = localStorage.getItem("token_life_time")
                    const timeStamp = new Date().getTime() - Number(tokenLifeTime)

                    const fourtyEightHours = 48 * 60 * 60 * 1080

                    if(timeStamp > fourtyEightHours) {
                        localStorage.removeItem("user_token")
                        localStorage.removeItem("token_life_time")
                    }
                })

                const userResponse = await axios.get(baseUrl+"/api/user/me", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            
                if (response.data) {
                    setUser(userResponse.data)
                } else {
                    console.log("Deu erro ao entrar")
                }
            }
        } catch (err) {
            console.log("Deu ruim " + err)
        }
    }

    const signUp = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post(baseUrl+"/auth/register", {name, email, password})

            if (response.status === 200) {
                console.log("Cadastrou")
            }
        } catch (err) {
            console.log("Deu ruim no cadastro" + err)
        }
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('user_token')
        localStorage.removeItem("token_life_time")
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, loading, signIn, signUp, signOut}}> 
            {children} 
        </AuthContext.Provider>
    )
}