import { useState } from "react"
import styles from "./CategoryAdmin.module.css"
import axios from "axios"
import { baseUrl, supabase } from "../../main"

export function CategoryAdmin() {
    const [ category, setCategory ] = useState('')
    const [ newImage, setNewImage ] = useState<File | null>(null)

    const userToken = localStorage.getItem("user_token")

    const handleNewCategory = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newImage) {
            const filePath = `category/${newImage.name}`
            await supabase.storage.from('images').upload(filePath, newImage)
        }
        if (!newImage?.name) return
        
        const newCategory: {} = {
            name: category,
            nameImage: newImage?.name
        }

        await axios.post(baseUrl+`/api/category`, newCategory, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })
        .then(() => {
            alert("Categoria inserida com sucesso!")
        })
        .catch(() => {
            alert("Erro ao inserir categoria!")
        })
    }

    return (
        <div>
            <form action="" className={styles.inputContent} onSubmit={handleNewCategory}>
                <div className={styles.inputItem}>
                    <label>Categoria</label>
                    <input 
                        type="text"
                        required
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </div>

                <div className={styles.inputItem}>
                    <label>Imagem</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        required
                        onChange={(e) => setNewImage(e.target.files ? e.target.files[0]: null)}
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}