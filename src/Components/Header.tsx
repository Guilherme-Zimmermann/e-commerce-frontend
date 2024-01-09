import { MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import styles from "./Header.module.css"

export function Header() {
    return (
        <header className={styles.container}>
            <strong>LogoMarca</strong> {/* Temporario */}
            <form className={styles.searchBar}>
                <input placeholder="Pesquisar"/>
                <button> <MagnifyingGlass size={32}/> </button>
            </form>
            <div className={styles.userContent}>
                <span> <User size={32}/> </span>
                <span> <ShoppingCart size={32}/> </span>
            </div>
        </header>
    )
}