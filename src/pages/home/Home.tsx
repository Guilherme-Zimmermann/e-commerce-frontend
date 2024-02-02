import { Category} from "../../components/category/Category";
import { Product } from "../../components/product/Product";


export function Home() {

    return (
        <div>
            <Category />
            <Product quantityInView={10}/>
            <Product filtered="Terno" quantityInView={5}/>
            <Product filtered="Gravata" quantityInView={5}/>
        </div>
    )
}