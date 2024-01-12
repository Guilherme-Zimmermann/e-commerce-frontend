import { Product } from "../../components/product/Product";
import { Category } from "../../components/category/Category";

import styles from "./ProductPage.module.css"

export function ProductPage() {
    return (
        <div className={styles.container}>
            <aside className={styles.selectCategory}>
                <h2>Categorias</h2>
                <ul>
                    <li></li>
                </ul>
            </aside>
            <div className={styles.content}>
                <Product />
            </div>
        </div>
    )
}