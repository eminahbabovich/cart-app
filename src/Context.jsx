import { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'
import {
  CLEAR_CART,
  DECREASE,
  INCREASE,
  DISPLAY_ITEMS,
  REMOVE,
  LOADING,
} from './actions'
import { getTotals } from './utils'

const url = 'https://www.course-api.com/react-useReducer-cart-project'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const initialState = {
  loading: true,
  cart: new Map(),
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { totalAmount, totalCost } = getTotals(state.cart)

  const clearCart = () => dispatch({ type: CLEAR_CART })
  const removeItem = (id) => dispatch({ type: REMOVE, payload: { id } })
  const increaseAmount = (id, amount) =>
    dispatch({ type: INCREASE, payload: { id } })
  const decreaseAmount = (id, amount) =>
    dispatch({ type: DECREASE, payload: { id } })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          console.log(error)
          dispatch({ type: LOADING })
          return
        }
        const data = await response.json()
        dispatch({ type: DISPLAY_ITEMS, payload: { data } })
      } catch (error) {
        console.log(error)
      }
      dispatch({ type: LOADING })
    }
    fetchData()
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        decreaseAmount,
        increaseAmount,
        clearCart,
        removeItem,
        totalCost,
        totalAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default AppProvider
