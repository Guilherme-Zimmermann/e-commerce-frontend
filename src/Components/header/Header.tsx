import { MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import { useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from 'react-router-dom'

import styles from "./Header.module.css"
import { useAuth } from "../../hooks/useAuth"
import { useCart } from "../../hooks/useCart"

export function Header() {
    const navigate = useNavigate()
    const { search, setSearch } = useContext(SearchContext)
    const { user, signed } = useAuth()
    const { cartItem } = useCart()

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
                {user?.role === "ADMIN" && <a href="/admin" className={styles.admin}>ADMIN PANEL</a>}
                <a href="/minha-conta" title="Perfil"> 
                    <User size={32}/> 
                </a>
                <a href={signed ? "/meu-carrinho" : "/checkout"} title="Carrinho"> 
                    <ShoppingCart size={32}/>
                    <span>{cartItem.filter(item => item.status === "PENDING").length}</span>
                </a>
            </div>
        </header>
    )
}