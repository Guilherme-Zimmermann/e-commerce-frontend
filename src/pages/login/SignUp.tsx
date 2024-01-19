import { useState } from "react";
import styles from "./Login.module.css"
import { AuthContextType } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
    const [ nameSignUp, setNameSignUp ] = useState("")
    const [ emailSignUp, setEmailSignUp ] = useState("")        
    const [ passwordSignUp, setPasswordSignUp ] = useState("")        

    const { signUp }: AuthContextType = useAuth();
    const navigate = useNavigate()

    const handleSingup = (e: React.FormEvent) => {
        e.preventDefault()
        if (!nameSignUp || !emailSignUp || !passwordSignUp) {
            return
        }


        signUp(nameSignUp, emailSignUp, passwordSignUp)
        navigate("/checkout")
    }

    return(
        <div  className={styles.formContainer}>
            <form action="" className={styles.login}>
                <div className={styles.loginInput}>
                    <input 
                        type="text" 
                        placeholder="Nome"
                        value={nameSignUp}
                        onChange={(e) => setNameSignUp(e.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        value={emailSignUp}
                        onChange={(e) => setEmailSignUp(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Senha"
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                </div>
                <button onClick={handleSingup}>Cadastrar</button>
                <span> 
                    Voltar para o <Link to="/checkout">Login</Link>
                </span>

            </form> 
        </div>
    )
}