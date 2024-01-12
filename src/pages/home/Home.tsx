import { Category} from "../../components/category/Category";
import { Product } from "../../components/product/Product";


export function Home() {

    return (
        <div>
            <Category />
            <Product />
            <Product filtered="Casamento"/>
            <Product filtered="Piscina"/>
        </div>
    )
}