import { useAuth } from "../../hooks/useAuth"
import styles from "./Profile.module.css"

export function Profile() {
    const { user } = useAuth()

    return (
        <div>Bem vindo {user?.name}</div>
    )
}