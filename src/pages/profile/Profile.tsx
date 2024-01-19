import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Profile.module.css"

export function Profile() {
    const { user } = useAuth()
    const firstName = user?.name?.split(" ")[0]

    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1>Olá {firstName}</h1>
                <Link to="/minha-conta">Minhas compras</Link>
                <Link to="/minha-conta/endereco">Meus endereços</Link>
                <a href="">Sair da conta</a>
            </nav>
            <Outlet />
        </div>
    )
}