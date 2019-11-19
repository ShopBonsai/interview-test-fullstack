import { createContext } from "react"

//default value for the toggle is an anonymous function that does nothing to avoid error
const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {}
})

export default CartContext