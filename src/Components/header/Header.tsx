import { MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import { useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from 'react-router-dom'

import styles from "./Header.module.css"

export function Header() {
    const navigate = useNavigate()
    const { search, setSearch } = useContext(SearchContext)

    const handleSubmit = (e : React.FormEvent) => {
        if (!search) {
            navigate("/")
            return
        }
        
        e.preventDefault()
        navigate(`/pesquisa/${search}`)
    }

    return (
        <header className={styles.container}>
            <a className={styles.logo} href="/">LogoMarca</a> {/* Temporario */}
            <form className={styles.searchBar} onSubmit={handleSubmit}>
                <input 
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit"> <MagnifyingGlass size={32}/> </button>
            </form>
            <div className={styles.userContent}>
                <a href="/admin">ADMIN PANEL</a>
                <span> <User size={32}/> </span>
                <span> <ShoppingCart size={32}/> </span>
            </div>
        </header>
    )
}