import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import styles from "./App.module.css"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter >
        <div className={styles.container}>
          <Router />
        </div>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
