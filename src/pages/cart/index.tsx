import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

function Cart() {

  const { cart, addItemCart, removeItemCart, total } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">
        Meu carrinho
      </h1>

      {cart.length === 0 && (
        <div className='flex flex-col items-center justify-center'>
          <p className='font-medium'>Ops, seu carrinho está vazio...</p>
          <Link to="/" className='bg-slate-600 my-3 py-3 px-8 text-white font-medium rounded'>
            Acessar produtos
          </Link>
        </div>
      )}

      {
        cart.map(item => (
          <section className="flex items-center justify-between border-b-2 border-gray-300" key={item.id}>
            <img src={item.cover} alt={item.title}
              className="w-28"
            />
            <strong>Preço: {item.price.toLocaleString('pt-BR', {
              style: "currency",
              currency: "BRL"
            })}</strong>

            <div className="flex items-center justify-center gap-3">
              <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => removeItemCart(item)}>
                -
              </button>
              {item.amount}
              <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => addItemCart(item)}>
                +
              </button>
            </div>

            <strong className="float-right">
              Subtotal: {item.total.toLocaleString('pt-BR', {
              style: "currency",
              currency: "BRL"
            })}
            </strong>
          </section>
        ))
      }

      {
        cart.length !== 0 && (
          <p className="font-bold mt-4">Total: {total}</p>
        )
      }
    </div>
  )
}

export default Cart
