import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import styles from "./App.module.css"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <div className={styles.container}>
          <Router />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
