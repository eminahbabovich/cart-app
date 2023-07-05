import {
  CLEAR_CART,
  DECREASE,
  INCREASE,
  DISPLAY_ITEMS,
  REMOVE,
  LOADING,
} from './actions'

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() }
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart)
    newCart.delete(action.payload.id)
    return { ...state, cart: newCart }
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart)
    let value = newCart.get(action.payload.id)
    value = { ...value, amount: value.amount + 1 }
    newCart.set(action.payload.id, value)
    return { ...state, cart: newCart }
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart)
    let value = newCart.get(action.payload.id)
    if (value.amount === 1) {
      newCart.delete(action.payload.id)
      return { ...state, cart: newCart }
    }
    value = { ...value, amount: value.amount - 1 }
    newCart.set(action.payload.id, value)
    return { ...state, cart: newCart }
  }
  if (action.type === LOADING) {
    return { ...state, loading: false }
  }
  if (action.type === DISPLAY_ITEMS) {
    const items = action.payload.data
    const mapItems = items.map((item) => [item.id, { ...item }])
    const itemMap = new Map(mapItems)
    return { ...state, cart: itemMap }
  }
  throw new Error(`No matching"${action.type}" - action type`)
}
export default reducer
