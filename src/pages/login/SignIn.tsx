import { useState } from "react";
import { AuthContextType } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
    const [ emailSignIn, setEmailSignIn ] = useState("")        
    const [ passwordSignIn, setPasswordSignIn ] = useState("")   
    const { signIn }: AuthContextType = useAuth();

    const [ error, setError ] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e : React.FormEvent) => {
        e.preventDefault()
        if (!emailSignIn || !passwordSignIn) {
            return
        }

        try {
            await signIn(emailSignIn, passwordSignIn)
            navigate("/minha-conta")
        } catch (error) {
            setError("Email ou senha inválidos")
        }
    }

    return (
        <div className={styles.formContainer}>
            <form action="" className={styles.login}>
                <div className={styles.loginInput}>
                    <input 
                        type="emailSignIn"
                        placeholder="Email"
                        value={emailSignIn}
                        onChange={(e) => setEmailSignIn(e.target.value)} 
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={passwordSignIn}
                        onChange={(e) => setPasswordSignIn(e.target.value)}
                    />
                </div>

                <button onClick={handleLogin}>Entrar</button>
                {error && <p style={{color: "red"}}>{error}</p>}

                <span>
                    Não possui uma conta? <Link to="/checkout/cadastrar">Cadastre-se</Link> 
                </span>  
            </form>
        </div>
    )
}