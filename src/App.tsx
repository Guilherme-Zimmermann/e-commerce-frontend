import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import styles from "./App.module.css"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { useEffect, useState } from "react"

function App() {
  const [ showAlert, setShowAlert ] = useState(false)

  useEffect(() => {
    const alertShown = localStorage.getItem("alertShown")
    if (!alertShown) {
      setShowAlert(true)
    }
  }, [])

  const handleAlertClose = (e: React.MouseEvent) => {
      e.preventDefault()

      setShowAlert(false)
      localStorage.setItem("alertShown", "true")
    }

  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter >
        <div className={styles.container}>
          { showAlert && (
            <div className={styles.alert}>
              <header>
                <h1>Atenção</h1>
              </header>
              <div className={styles.textContent}>
                <p>
                  Gostaria de esclarecer que este site foi desenvolvido exclusivamente com o propósito de 
                  me desafiar e melhorar minhas habilidades.
                </p>
                <p>
                  Tanto sua hospedagem quanto o banco, estão rodando em serviços gratuitos
                </p>
                <p>
                  Embora você possa navegar pelos produtos, por favor, esteja ciente de que não é possível efetuar 
                  compras reais neste momento.
                  Estou feliz em apresentar uma variedade de produtos fictícios e experiências de compra 
                  simuladas para destacar meu trabalho.
                </p>
                <p>
                  Se você tiver alguma dúvida ou feedback, não hesite em entrar em contato. Agradeço 
                  sua visita e interesse em meu trabalho!
                </p>
                <p>
                  Atenciosamente,
                  Guilherme Will Zimmermann
                </p>
              </div>
              <button onClick={handleAlertClose}>Li e estou ciente!</button>
            </div>
          )}
          <Router />
        </div>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
