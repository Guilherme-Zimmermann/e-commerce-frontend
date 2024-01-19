import styles from "./Profile.module.css"

export function ProfileAddress() {
    return (
        <div className={styles.addressContent}>
            <header>
                <h2>Meus endereços</h2>
                <button>Adicionar Endereço</button>
            </header>
            <div className={styles.emptyAddress}>
                <img src="/public/box.svg" alt="" />
                <p>Não tem endereço cadastrado</p>
            </div>
        </div>
    )
}