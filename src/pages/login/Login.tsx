import React, { useState } from "react"
import styles from "./Login.module.css"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../context/AuthContext";

export function Login() {
    const [ name, setName ] = useState("")
    const [ newEmail, setNewEmail ] = useState("")        
    const [ newPassword, setNewPassword ] = useState("")        

    const [ email, setEmail ] = useState("")        
    const [ password, setPassword ] = useState("")        

    const { signin, signup }: AuthContextType = useAuth();
    const navigate = useNavigate()

    const handleLogin = (e : React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            return
        }

        signin(email, password)
        navigate("/perfil")
    }

    const handleSingup = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !newEmail || !newPassword) {
            return
        }


        signup(name, newEmail, newPassword)
        navigate("/perfil")
    }

    return (
        <div>
            <form action="" className={styles.signIn}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Entrar</button>
            </form>

            <form action="" className={styles.signUp}>
                <input 
                    type="text" 
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <button onClick={handleSingup}>Cadastrar</button>
            </form>
        </div>
    )
}