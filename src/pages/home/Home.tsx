import { Category} from "../../components/category/Category";
import { Product } from "../../components/product/Product";


export function Home() {

    return (
        <div>
            <Category />
            <Product quantityInView={10}/>
            <Product filtered="Casamento" quantityInView={5}/>
            <Product filtered="Piscina" quantityInView={5}/>
        </div>
    )
}