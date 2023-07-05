// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
import { useGlobalContext } from './Context'

function App() {
  const { loading } = useGlobalContext()

  return loading ? (
    <main>
      <div className="loading" style={{ marginTop: '6rem' }}>
        .
      </div>
    </main>
  ) : (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
