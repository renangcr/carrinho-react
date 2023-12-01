import { useEffect, useState, useContext } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { ProductsProps } from '../home';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { CartContext } from '../../contexts/CartContext';

export const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({} as ProductsProps);
    const navigate = useNavigate();

    const { addItemCart } = useContext(CartContext);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }

        getProducts();
    }, []);

    function handleAddCart(){
        addItemCart(product);
        navigate('/carrinho');
    }

    return (
        <>
            {
                product?.title ? (
                    <div className='flex w-full mt-6 max-w-7xl mx-auto px-4 max-md:flex-col max-md:items-center'>
                        <img src={product.cover} alt={product.title} className='max-w-md w-full' />

                        <div className='flex flex-col gap-3'>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                            <div className='flex gap-3 items-center'>
                                <strong className='text-zinc-700/90'>{product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>
                                <button className='bg-zinc-900 p-1 rounded' onClick={() => handleAddCart()}>
                                    <BsCartPlus size={20} color="#fff" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Produto não encontrado</h1>
                )
            }
        </>
    )
}