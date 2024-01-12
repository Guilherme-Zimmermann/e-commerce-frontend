import { useState } from "react"
import styles from "./CategoryAdmin.module.css"
import axios from "axios"

export function CategoryAdmin() {
    const [ newCategory, setNewCategory ] = useState('')
    const [ newImage, setNewImage ] = useState<File | null>(null)

    async function handleCreateNewCategory(event: React.FormEvent) {
        event.preventDefault()

        if(!newCategory || !newImage) {
            return
        }

        const formData = new FormData()
        formData.append('name', newCategory)
        if (newImage) {
            formData.append('image', newImage)
        }

        await axios.post("http://localhost:8080/api/category", formData)
        .then((response) => {
            console.log(response.data)
            console.log("Deu bom")
            setNewCategory('');
            setNewImage(null);
            (event.target as HTMLFormElement).reset();
        })
        .catch((err) => {
            console.log("Deu ruim" + err)
        })
    }

    return (
        <div>
            <form action="" className={styles.inputContent} onSubmit={handleCreateNewCategory}>
                <div className={styles.inputItem}>
                    <label>Categoria</label>
                    <input 
                        type="text"
                        required
                        onChange={(e) => setNewCategory(e.target.value)}
                        value={newCategory}
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