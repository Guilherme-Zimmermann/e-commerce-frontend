import { MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import { useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from 'react-router-dom'

import styles from "./Header.module.css"
import { useAuth } from "../../hooks/useAuth"

export function Header() {
    const navigate = useNavigate()
    const { search, setSearch } = useContext(SearchContext)
    const { user } = useAuth()

    const handleSubmit = (e : React.FormEvent) => {
        if (!search) {
            navigate("/")
            return
        }

        const cleanedSearch = search.replace(/[%",!@#$%¨&*()]/g, "")
        
        if (!cleanedSearch) {
            return
        }
        
        e.preventDefault()
        navigate(`/pesquisa/${cleanedSearch}`)
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
                <button type="submit" title="Pesquisar"> <MagnifyingGlass size={32}/> </button>
            </form>
            <div className={styles.userContent}>
                {user?.role === "ADMIN" && <a href="/admin">ADMIN PANEL</a>}
                <a href="/minha-conta" title="Perfil"> 
                    <User size={32}/> 
                </a>
                <a href="" title="Carrinho"> 
                    <ShoppingCart size={32}/> 
                </a>
            </div>
        </header>
    )
}