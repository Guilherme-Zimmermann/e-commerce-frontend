import { useEffect, useState } from 'react';
import { Product } from '../../components/product/Product';
import axios from 'axios';
import styles from "./ProductList.module.css"
import { Category } from '../../components/category/Category';
import { baseUrl, baseUrlImages } from '../../main';

export function ProductList() {
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ categories, setCategories ] = useState<Category[]>([])

    const [ editProduct, setEditProduct ] = useState<{ price: string; [key: string]: any } | Product | null>(null)
    const [editImage, setEditImage] = useState<File | null>(null)
    const userToken = localStorage.getItem("user_token")

    // Fetch produtos
    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get(baseUrl+'/api/product');
            setProducts(response.data);
        }

        fetchProducts();
    }, []);

    // Fetch categorias
    useEffect(() => {
        async function fetchCategories() {
            const response = await axios.get(baseUrl+"/api/category")
            setCategories(response.data)
        }

        fetchCategories();
    }, [])

    // Editar produto
    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!editProduct || !editImage) {
        return
        }

        const formData = new FormData()
        formData.append("name", editProduct.name)
        formData.append("description", editProduct.description)
        formData.append("price", String(editProduct.price))
        formData.append("sizeP", editProduct.sizeP)
        formData.append("image", editImage)
        formData.append("category", editProduct.category.id)

        console.log(editProduct.category.id)

        await axios.put(baseUrl+`/api/product/${editProduct.id}`, formData, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
        .then((response) => {
            console.log(response.data)
            alert("Produto editado com sucesso")
            setProducts(products.map(p => p.id === editProduct.id ? response.data : p))

            setEditProduct(null)
            setEditImage(null)
        })
        .catch((err) => {
            console.log("Deu ruim" + err)
        })
    };

    // Deletar produto
    const handleDelete = async (productId: string) => {
        await axios.delete(baseUrl+`/api/product/${productId}`, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
        .then(() => {
            alert("Deletado com sucesso")
            setProducts(products.filter(p => p.id !== productId))
        })
        .catch(() => {
            console.log("Deu ruim")
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContent}>
                <table>
                    <thead>
                        <tr>
                            <th>Nome do produto</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Tamanho</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const imageUrl = `${baseUrlImages}/product/${product.nameImage}`;
                            return (
                                <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.sizeP}</td>
                                <td><img src={imageUrl} alt="" /></td>
                                <td>{product.category.name}</td>
                                <td className={styles.btns}>
                                    <button onClick={() => setEditProduct(product)}>Editar</button>
                                    <button onClick={() => handleDelete(product.id)}>Apagar</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {editProduct && (
                <form onSubmit={handleEditSubmit}>
                    <div>
                        <label htmlFor="">Nome do produto</label>
                        <input 
                            type="text" 
                            value={editProduct.name} 
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} 
                            />
                    </div>
                    <div>
                        <label htmlFor="">Descrição</label>
                        <input 
                            type="text" 
                            value={editProduct.description}
                            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label htmlFor="">Preço</label>
                        <input 
                            type="number" 
                            value={editProduct ? editProduct.price : ''}
                            onChange={(e) => editProduct && setEditProduct({ ...editProduct, price: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label htmlFor="">Tamanho</label>
                        <input 
                            type="text" 
                            value={editProduct.sizeP}
                            onChange={(e) => setEditProduct({ ...editProduct, sizeP: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label htmlFor="">Imagem</label>
                        <input 
                            type="file" 
                            accept='image/*'
                            onChange={(e) => setEditImage(e.target.files ? e.target.files[0] : null)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="">Categoria</label>
                        <select 
                            name="category"
                            onChange={(e) => {
                                const selectedCategory = categories.find(category =>  category.id === e.target.value)
                                if (selectedCategory) {
                                    setEditProduct({ ...editProduct, category: selectedCategory})
                                }
                            }}
                            required
                            >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button type='submit'>Salvar</button>
                    </div>
                </form>
            )}
        </div>
    );
}