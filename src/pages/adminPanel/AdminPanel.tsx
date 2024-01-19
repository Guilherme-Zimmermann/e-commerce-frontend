import { Link, Outlet } from "react-router-dom"
import styles from "./AdminPanel.module.css"

export function AdminPanel() {

    return (
        <div className={styles.container}>
            <h2>AdminPanel</h2>
            <div className={styles.content}>
                <aside className={styles.options}>
                    <ul>
                        <li><Link to="/admin/usuarios">Usuário</Link></li>
                        <li><Link to="/admin/categorias">Categoria</Link></li>
                        <li><Link to="/admin/produtos">Produto</Link></li>
                    </ul>
                </aside>
                <Outlet />
            </div>
        </div>
    )
}