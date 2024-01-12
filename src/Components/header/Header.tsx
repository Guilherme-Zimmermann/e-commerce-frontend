import { MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import styles from "./Header.module.css"

export function Header() {
    return (
        <header className={styles.container}>
            <a className={styles.logo} href="/">LogoMarca</a> {/* Temporario */}
            <form className={styles.searchBar}>
                <input placeholder="Pesquisar"/>
                <button> <MagnifyingGlass size={32}/> </button>
            </form>
            <div className={styles.userContent}>
                <a href="/admin">ADMIN PANEL</a>
                <span> <User size={32}/> </span>
                <span> <ShoppingCart size={32}/> </span>
            </div>
        </header>
    )
}