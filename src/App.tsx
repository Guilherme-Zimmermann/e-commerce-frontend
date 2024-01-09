import styles from "./App.module.css"
import { Categories } from "./Components/Categories"
import { Header } from "./Components/Header"

function App() {
  return (
    <div className={styles.container}>
      <Header />
        { /* Adicionar Slide de imagens */}
      <Categories />
    </div>
  )
}

export default App
