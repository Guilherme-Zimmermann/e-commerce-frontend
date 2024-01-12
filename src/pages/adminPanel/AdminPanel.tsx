import { Outlet } from "react-router-dom"
import styles from "./AdminPanel.module.css"

export function AdminPanel() {

    return (
        <div className={styles.container}>
            <h2>AdminPanel</h2>
            <div className={styles.content}>
                <aside className={styles.options}>
                    <ul>
                        <li><a href="/admin/users">Usuário</a></li>
                        <li><a href="/admin/categories">Categoria</a></li>
                        <li><a href="/admin/products">Produto</a></li>
                    </ul>
                </aside>
                <Outlet />
            </div>
        </div>
    )
}