import styles from "./Profile.module.css"

export function ProfileShopping() {
    return (
        <div className={styles.shoppingContent}>
            <h2>Minhas compras</h2>
            <div className={styles.emptyShopping}>
                <img src="/public/box.svg" alt="" />
                <p>Nenhuma compra feita</p>
            </div>
        </div>
    )
}