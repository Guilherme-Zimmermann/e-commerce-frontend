import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { AdminPanel } from "./pages/adminPanel/AdminPanel"
import { DefaultLayout } from "./layout/DefaultLayout"
import { CategoryAdmin } from "./componentsAdmin/categoryAdmin/CategoryAdmin"
import { ProductAdmin } from "./componentsAdmin/productAdmin/ProductAdmin"
import { Product } from "./components/product/Product"
import { ProductPage } from "./pages/productsPage/ProductsPage"
import { ProductItemPage } from "./pages/productItemPage/ProductItemPage"
import { Login } from "./pages/login/Login"
import { Profile } from "./pages/profile/Profile"
import { useAuth } from "./hooks/useAuth"

const Private = ({ Item }: any) => {
    const { signed, loading }: any = useAuth()
    
    if (loading) {
        return <div>Carregando...</div>
    }

    return signed ? <Item /> : <Login />
}

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pesquisa/:query" element={<Product />}/>
                <Route path="/:categoria?/produtos" element={<ProductPage />}/>
                <Route path="/:id/:produto" element={<ProductItemPage />}/>
                <Route path="/perfil" element={<Private Item={Profile} />}/>

                <Route path="/admin" element={<AdminPanel />} >
                    <Route path="categorias" element={<CategoryAdmin />}/>
                    <Route path="produtos" element={<ProductAdmin />}/>
                    
                </Route>

            </Route>
        </Routes>
    )
}