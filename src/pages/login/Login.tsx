import { Link, Outlet } from "react-router-dom";
import styles from "./Login.module.css"

export function Login() {

    return (
        <div className={styles.container}>
            <header>
                <Link to="/">LogoMarca</Link>
            </header>

            <Outlet />
        </div>  
    )
}