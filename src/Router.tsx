import { Routes, Route, useNavigate } from "react-router-dom"
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
import { SignUp } from "./pages/login/SignUp"
import { SignIn } from "./pages/login/SignIn"
import { ProfileShopping } from "./pages/profile/ProfileShopping"
import { ProfileAddress } from "./pages/profile/ProfileAddress"

const Private = ({ Item }: any) => {
    const { signed, loading }: any = useAuth()
    const navigate = useNavigate()
    
    if (loading) {
        return <div>Carregando...</div>
    }

    if (!signed) {
        navigate("/checkout")
        return
    }
    
    return <Item />
}

export function Router() {
    return (
        <Routes>
            <Route path="/checkout" element={<Login />} >
                <Route index element={<SignIn />}/>
                <Route path="cadastrar" element={<SignUp />}/>
            </Route>

            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pesquisa/:query" element={<Product />}/>
                <Route path="/:categoria?/produtos" element={<ProductPage />}/>
                <Route path="/:id/:produto" element={<ProductItemPage />}/>

                <Route path="/minha-conta" element={<Private Item={Profile} />} >
                    <Route index element={<ProfileShopping />}/>
                    <Route path="endereco" element={<ProfileAddress />}/>
                </Route>

                <Route path="/admin" element={<AdminPanel />} >
                    <Route path="categorias" element={<CategoryAdmin />}/>
                    <Route path="produtos" element={<ProductAdmin />}/>
                    
                </Route>

            </Route>
        </Routes>
    )
}