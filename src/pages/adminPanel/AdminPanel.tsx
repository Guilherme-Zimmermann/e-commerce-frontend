import { Outlet } from "react-router-dom"
import styles from "./AdminPanel.module.css"

export function AdminPanel() {

    return (
        <div className={styles.container}>
            <h2>AdminPanel</h2>
            <div className={styles.content}>
                <aside className={styles.options}>
                    <ul>
                        <li><a href="/admin/usuarios">Usuário</a></li>
                        <li><a href="/admin/categorias">Categoria</a></li>
                        <li><a href="/admin/produtos">Produto</a></li>
                    </ul>
                </aside>
                <Outlet />
            </div>
        </div>
    )
}