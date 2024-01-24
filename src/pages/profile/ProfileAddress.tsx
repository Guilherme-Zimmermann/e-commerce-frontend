import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Profile.module.css"
import { X } from "phosphor-react"
import axios from "axios"
import { baseUrl } from "../../main"

interface Address {
    id?: string
    state: string
    city: string
    nbh: string
    r_number: string
    zipCode: string
    user?: {id: string}
}

export function ProfileAddress() {
    const { user } = useAuth()
    const [ showForm, setShowForm ] = useState(false)
    const [ state, setState ] = useState("")
    const [ city, setCity ] = useState("")
    const [ nbh, setNbh ] = useState("")
    const [ r_number, setR_number  ] = useState("")
    const [ zipCode, setZipCode  ] = useState("")
    const [ loading, setLoading ] = useState(true)

    const [ address, setAddress ] = useState<Address | null>(null)

    const [ editAddress, setEditAddress ] = useState<Address | null>(null)

    // Fetch endereço
    useEffect(() => {
        async function fetchAddress() {
            const response = await axios.get(baseUrl+`/api/address/user/${user?.id}`)
            setAddress(response.data)
            setLoading(false)
        }
        
        fetchAddress()
    }, [])

    // Fechar formulário de endereço
    const closeForm = (e: React.FormEvent) => {
        e.preventDefault()

        setShowForm(false)
    }

    // Salvar endereço
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const handleInsertAddress: Address = {
            state,
            city,
            nbh,
            r_number,
            zipCode,
            user: {id: user?.id || ""}
        }

        await axios.post(baseUrl+"/api/address", handleInsertAddress)
        .then((response) => {
            setAddress(response.data)
            setShowForm(false)
        })
        .catch(() => {
            console.log("Deu ruim")
        })
    }

    // Salvar edição de endereço
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const handleEditAddress: Address = {
            state: editAddress?.state || "",
            city: editAddress?.city || "",
            nbh : editAddress?.nbh || "",
            r_number : editAddress?.r_number || "",
            zipCode : editAddress?.zipCode || "",
        }

        await axios.put(baseUrl+`/api/address/${address?.id}`, handleEditAddress)
        .then((response) => {
            setAddress(response.data)
            setEditAddress(null)
        })
        .catch(() => {
            console.log("Deu ruim")
        })
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()

        const userConfirmation = window.confirm("Deseja excluir seu endereço?")

        if (!userConfirmation) {
            return
        }

        await axios.delete(baseUrl+`/api/address/${address?.id}`)
        .then(() => {
            setAddress(null)
        })
        .catch(() => {
            console.log("Deu ruim")
        })
    }

    // Fechar formulário de edição de endereço
    const closeEditForm = (e: React.FormEvent) => {
        e.preventDefault()

        setEditAddress(null)
    }
    
    return (
        <div className={styles.addressContent}>
            <header>
                <h2>Meus endereços</h2>
                <button className={styles.btnAddAddress}
                    onClick={() => setShowForm(true)}> 
                        Adicionar Endereço
                </button>
            </header>

            { loading ? (
                <div className={styles.emptyAddress}>Carregando...</div>
            ) : address ? (
                <div className={styles.addressContainer}>
                    <div className={styles.address}>
                        <ul>
                            <li><span>Estado:</span> {address.state}</li>
                            <li><span>Cidade:</span> {address.city}</li>
                            <li><span>Bairro:</span> {address.nbh}</li>
                            <li><span>Número Residêncial:</span> {address.r_number}</li>
                            <li><span>Cep:</span> {address.zipCode}</li>
                        </ul>
                    </div>
                    <div className={styles.btnContent}>
                        <button className={styles.usualButton} onClick={() => setEditAddress(address)}>Editar</button>
                        <button className={styles.usualButton} onClick={handleDelete}>Deletar</button>
                    </div>
                </div>
            ) : (
                <div className={styles.emptyAddress}>  
                <img src="/public/box.svg" alt="" />
                <p>Nenhum endereço salvo</p>
            </div>
            )}
            
            {showForm && (
                <form action="" className={styles.formContainer} onSubmit={handleSubmit}>
                    <button 
                        className={styles.closeButton} 
                        onClick={closeForm}> 
                            <X size={24}/> 
                    </button>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Estado</label>
                        <input 
                            type="text"
                            name="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Cidade</label>
                        <input 
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Bairro</label>
                        <input 
                            type="text" 
                            name="nbh"
                            value={nbh}
                            onChange={(e) => setNbh(e.target.value)}  
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Número</label>
                        <input 
                            type="text"  
                            name="r_number"
                            value={r_number}
                            onChange={(e) => setR_number(e.target.value)} 
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">CEP</label>
                        <input 
                            type="text"  
                            name="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)} 
                        />
                    </div>

                    <button type="submit" className={styles.btnSaveAddress}>Salvar</button>
                </form>

            )}

            {editAddress && (
                <form className={styles.formContainer} onSubmit={handleEditSubmit}>
                    <button 
                        className={styles.closeButton} 
                        onClick={closeEditForm}> 
                            <X size={24}/> 
                    </button>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Estado: </label>
                        <input 
                            type="text"
                            value={editAddress.state}
                            onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })}    
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Cidade: </label>
                        <input 
                            type="text"
                            value={editAddress.city}
                            onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}    
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Bairro: </label>
                        <input 
                            type="text"
                            value={editAddress.nbh}
                            onChange={(e) => setEditAddress({ ...editAddress, nbh: e.target.value })}    
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Número Residêncial: </label>
                        <input 
                            type="text"
                            value={editAddress.r_number}
                            onChange={(e) => setEditAddress({ ...editAddress, r_number: e.target.value })}    
                        />
                    </div>
                    <div className={styles.inputContent}>
                        <label htmlFor="">Cep: </label>
                        <input 
                            type="text"
                            value={editAddress.zipCode}
                            onChange={(e) => setEditAddress({ ...editAddress, zipCode: e.target.value })}    
                        />
                    </div>
                    <button type="submit" className={styles.btnSaveAddress}>Salvar</button>
                </form>
            )}
        </div>
    )
}