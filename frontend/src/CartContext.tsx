import React, { createContext, useState, useContext } from 'react';

export type CartItem = {
    name: string;
    quantity: number;
    unitPrice: number;
    type: "burger" | "side" | "drink";
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => {},
    clear: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setItems(prev => {
            //Agrupa por nombre y tipo
            const existing = prev.find(i => i.name === item.name && i.type === item.type);
            if (existing) {
                return prev.map(i => 
                    i.name === item.name && i.type === item.type
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };
    const clear = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, addItem, clear }}>
            {children}
        </CartContext.Provider>
    );
};