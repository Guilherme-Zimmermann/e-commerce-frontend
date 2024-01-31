import { useState } from "react";
import styles from "./Login.module.css"
import { AuthContextType } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
    const [ nameSignUp, setNameSignUp ] = useState("")
    const [ emailSignUp, setEmailSignUp ] = useState("")        
    const [ passwordSignUp, setPasswordSignUp ] = useState("")        
    const [ error, setError ] = useState("")

    const { signUp }: AuthContextType = useAuth();
    const navigate = useNavigate()

    const handleSingup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nameSignUp || !emailSignUp || !passwordSignUp) {
            return
        }

        if (passwordSignUp.length < 6) {
            setError('A senha deve ter mais de 6 dígitos.');
            return
        }

        try {
            await signUp(nameSignUp, emailSignUp, passwordSignUp);
                window.alert("Você se cadastrou com sucesso");
                navigate("/checkout");
        } catch (error) {
            setError("O email inserido já foi cadastrado")   
        }
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
                        type="password"
                        placeholder="Senha"
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                </div>
                <button onClick={handleSingup}>Cadastrar</button>
                {error && <p style={{color: "red"}}>{error}</p>}
                <span> 
                    Voltar para o <Link to="/checkout">Login</Link>
                </span>

            </form> 
        </div>
    )
}