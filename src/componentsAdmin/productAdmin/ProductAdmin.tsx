import { useEffect, useState } from "react"
import styles from "./ProductAdmin.module.css"
import axios from "axios"
import { Category } from "../../components/category/Category"
import { ProductList } from "./ProductList"
import { baseUrl, supabase } from "../../main"

export function ProductAdmin() {
    const [ productName, setProductName ] = useState('')
    const [ productDescription, setProductDescription ] = useState('')
    const [ productPrice, setProductPrice ] = useState('')
    const [ productSize, setProductSize ] = useState('')
    const [ newCategory, setNewCategory ] = useState('')

    const [ image, setImage ] = useState<File | null>(null)
    
    const [ categories, setCategories ] = useState<Category[]>([])
    const userToken = localStorage.getItem("user_token")

    const handleCreateNewProduct = async (e: React.FormEvent) => {
        e.preventDefault()

        if (image) {
            const filePath = `product/${image.name}`
            await supabase.storage.from('images').upload(filePath, image)
        }

        if (!image?.name) return

        const newProduct: {} = {
            name: productName,
            description: productDescription,
            price: productPrice,
            sizeP: productSize,
            nameImage: image.name,
            category: {id: newCategory},
        }

        await axios.post(baseUrl+"/api/product", newProduct, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
        .then (() => {
            alert("Produto adicionado com sucesso!")
        })
        .catch (() => {
            alert("Erro ao adicionar o produto!")
        })
    }

    useEffect(() => {
        async function fetchCategories() {
            const response = await axios.get(baseUrl+"/api/category")
            setCategories(response.data)
        }

        fetchCategories();
    }, [])
    

    return (
        <div className={styles.container}>
            <div>
                <form action="" className={styles.inputContent} onSubmit={handleCreateNewProduct}>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Nome do produto</label>
                        <input 
                            type="text" 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Descrição</label>
                        <input 
                            type="text" 
                            name="description"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                            />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Preço</label>
                        <input
                            type="number"
                            name="price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                            />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Tamanho</label>
                        <input 
                            type="text" 
                            name="sizeP"
                            value={productSize}
                            onChange={(e) => setProductSize(e.target.value)}
                            required
                            />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Imagem</label>
                        <input 
                            type="file" 
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0]: null)}
                            required
                            />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor="">Categoria</label>
                        <select 
                            name="category"
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                            >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Salvar</button>
                </form>
            </div>
            <ProductList/>
        </div>
    )
}