import React, { useEffect, useState } from "react"
import styles from "./ProductAdmin.module.css"
import axios from "axios"
import { Category } from "../../components/category/Category"

export function ProductAdmin() {
    const [ form, setForm ] = useState({
        productName: '',
        description: '',
        price: '',
        sizeP: '',
        category: ''
    })
    const [ image, setImage ] = useState<File | null>(null)
    const [ categories, setCategories ] = useState<Category[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleCreateNewProduct(event: React.FormEvent) {
        event.preventDefault()

        if (!form.productName || !form.description || !form.price || !form.sizeP || !image || !form.category) {
            return
        }

        const formData = new FormData()
        formData.append("name", form.productName)
        formData.append("description", form.description)
        formData.append("price", form.price)
        formData.append("sizeP", form.sizeP)
        formData.append("image", image)
        formData.append("category", form.category)

        await axios.post("http://localhost:8080/api/product", formData)     
        .then((response) => {
            console.log(response.data)
            console.log("Deu bom")
            setForm({
                productName: '',
                description: '',
                price: '',
                sizeP: '',
                category: ''
            })
            setImage(null);
            (event.target as HTMLFormElement).reset();
        })
        .catch((err) => {
            console.log("Deu ruim" + err)
        })
    }

    useEffect(() => {
        async function fetchCategories() {
            const response = await axios.get("http://localhost:8080/api/category")
            setCategories(response.data)
        }

        fetchCategories();
    }, [])

    return (
        <div>
            <form action="" className={styles.inputContent} onSubmit={handleCreateNewProduct}>
                <div className={styles.inputItem}>
                    <label htmlFor="">Nome do produto</label>
                    <input 
                        type="text" 
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor="">Descrição</label>
                    <input 
                        type="text" 
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor="">Preço</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor="">Tamanho</label>
                    <input 
                        type="text" 
                        name="sizeP"
                        value={form.sizeP}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        >
                        {categories.map((category) => (
                            <option key={category.id} value={form.category = category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}