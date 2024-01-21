import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Profile.module.css"

export function Profile() {
    const { user, signOut } = useAuth()
    const firstName = user?.name?.split(" ")[0]
    const navigate = useNavigate()

    const handleSignOut = (e: React.FormEvent) => {
        e.preventDefault()

        signOut()
        window.alert("Você saiu da sua conta")
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1>Olá {firstName}</h1>
                <Link to="/minha-conta">Minhas compras</Link>
                <Link to="/minha-conta/endereco">Meus endereços</Link>
                <button onClick={handleSignOut}>Sair da conta</button>
            </nav>
            <Outlet />
        </div>
    )
}