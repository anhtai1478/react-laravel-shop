import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(0);

    const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};

        let totalItems = 0;


        // duyệt qua từng sản phẩm trong giỏ hàng và tính tổng số lượng
        for (const id in cart) {
            totalItems += cart[id];
            console.log("Sản phẩm ID:", id, "Số lượng:", cart[id]);
        }

        setCartItems(totalItems);
    };

   
    useEffect(() => { updateCart()}, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                updateCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}