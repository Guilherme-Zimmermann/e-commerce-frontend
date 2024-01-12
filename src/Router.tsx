import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { AdminPanel } from "./pages/adminPanel/AdminPanel"
import { DefaultLayout } from "./layout/DefaultLayout"
import { CategoryAdmin } from "./componentsAdmin/categoryAdmin/CategoryAdmin"
import { ProductAdmin } from "./componentsAdmin/productAdmin/ProductAdmin"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} >
                    <Route path="categories" element={<CategoryAdmin />}/>
                    <Route path="products" element={<ProductAdmin />}/>
                    
                </Route>

            </Route>
        </Routes>
    )
}