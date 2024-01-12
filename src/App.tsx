import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import styles from "./App.module.css"

function App() {
  return (
    <BrowserRouter >
      <div className={styles.container}>
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App
