import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../Components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart () {
    return useContext(ShoppingCartContext)
}

export default function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currentItems: any[]) => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
                })
            }
            })
        }

        function decreaseCartQuantity(id: number) {
            setCartItems((currentItems: any[]) => {
                if (currentItems.find(item => item.id === id)?.quantity === 1) {
                    return currentItems.filter(item => item.id !== id)
                } else {
                    return currentItems.map(item => {
                        if (item.id === id) {
                            return { ...item, quantity: item.quantity - 1 }
                        } else {
                            return item
                        }
                    })
                }
                })
            }

            function removeFromCart(id: number) {
                setCartItems(currentItems => {
                    return currentItems.filter(item => item.id !== id)
                })
            }

            const cartQuantity = cartItems.reduce(
                (quantity, item) => item.quantity + quantity, 0
            )
    return <ShoppingCartContext.Provider value={{
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart, 
        openCart, 
        closeCart,
        cartItems, 
        cartQuantity, 
        }}>
        <ShoppingCart isOpen={isOpen} />
        {children}
    </ShoppingCartContext.Provider>
}