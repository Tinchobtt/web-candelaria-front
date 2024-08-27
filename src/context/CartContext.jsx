import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        const index = findIndexItem(product.id)

        if (index !== -1) {
            changeQuantity(product.id, add=true)
        } else {
            setCart([...cart, { id: product.id, quantity: 1 }]);
        }
    };

    const deleteFromCart = (id) => {
        const updatedCart = cart.filter( prod => prod.id !== id)
        setCart(updatedCart)
    }

    const changeQuantity = (id, add) => {
        const index = findIndexItem(id)

        if (index !== -1) {
            const product = cart[index];
            const newQuantity = product.quantity + (add ? 1 : -1);

            if (newQuantity > 0) {
                const updatedCart = cart.map((prod, i) =>
                    i === index ? { ...prod, quantity: newQuantity } : prod
                );
                setCart(updatedCart);
            } else {
                deleteFromCart(id);
            }
        }
    }

    const findIndexItem = (id) => cart.findIndex(prod => prod.id === id)

    return (
        <CartContext.Provider value={{
            addToCart,
            deleteFromCart,
            changeQuantity,
            cart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext(CartContext)