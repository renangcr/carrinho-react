import { createContext, ReactNode, useState } from 'react';
import { ProductsProps } from '../pages/home';

import toast from 'react-hot-toast';

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

interface CartProps extends ProductsProps {
    amount: number;
    total: number;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);


export default function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProductsProps){
        const indexItem = cart.findIndex(item => item.id === newItem.id);
        if(indexItem !== -1){
            let cartList = cart;

            cartList[indexItem].amount += 1;
            cartList[indexItem].total =  cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);

            return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);
        totalResultCart([...cart, data]);
    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id);
        let cartList = cart;

        if(cartList[indexItem].amount === 1){
            const newList = cartList.filter(item => item.id !== product.id);

            setCart(newList);
            totalResultCart(newList);

            toast.success("Produto removido", {
                style: {
                    backgroundColor: "#121212",
                    color: "#FFF"
                }
            })

            return
        }

        cartList[indexItem].amount -= 1;
        cartList[indexItem].total =  cartList[indexItem].amount * cartList[indexItem].price;

        setCart(cartList);
        totalResultCart(cartList);
    }

    function totalResultCart(items: CartProps[]){
        
        const myCart = items;

        const result = myCart.reduce((acc, obj) =>  acc + obj.total , 0);

        const resultFormated = result.toLocaleString('pt-BR', { style: "currency", currency: "BRL"});

        setTotal(resultFormated);
    }

    return (
        <CartContext.Provider value={{ cart, cartAmount: cart.length,addItemCart, removeItemCart, total }}>
            {children}
        </CartContext.Provider>
    )
}