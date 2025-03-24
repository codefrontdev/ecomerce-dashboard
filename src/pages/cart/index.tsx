/** @format */

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import {
  CartItem,
  clearCart,
  removeFromCart,
  updateQuantity,
  addManualOrder,
} from "../../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [manualOrder, setManualOrder] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [abandonedCarts, setAbandonedCarts] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setAbandonedCarts(true);
    }
  }, [cart]);

  const handleManualOrder = () => {
    if (manualOrder.name && manualOrder.price && manualOrder.quantity) {
      dispatch(
        addManualOrder({
          id: Date.now(),
          name: manualOrder.name,
          price: parseFloat(manualOrder.price),
          image: "https://via.placeholder.com/150",
          quantity: parseInt(manualOrder.quantity),
        })
      );
      setManualOrder({ name: "", price: "", quantity: "" });
    }
  };

  return (
    <div className='flex-1'>
      <div className='p-4 bg-gray-100 dark:text-white dark:bg-gray-800 rounded-lg'>
        <h3 className='text-lg font-bold mb-2'>Manual Order</h3>
        <input
          type='text'
          placeholder='Product Name'
          value={manualOrder.name}
          onChange={(e) =>
            setManualOrder({ ...manualOrder, name: e.target.value })
          }
          className='border p-2 rounded dark:border-white mr-2'
        />
        <input
          type='number'
          placeholder='Price'
          value={manualOrder.price}
          onChange={(e) =>
            setManualOrder({ ...manualOrder, price: e.target.value })
          }
          className='border dark:border-white p-2 rounded mr-2'
        />
        <input
          type='number'
          placeholder='Quantity'
          value={manualOrder.quantity}
          onChange={(e) =>
            setManualOrder({ ...manualOrder, quantity: e.target.value })
          }
          className='border dark:border-white p-2 rounded mr-2'
        />
        <button
          onClick={handleManualOrder}
          className='bg-orange-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-700'>
          Add Order
        </button>
      </div>
      <div className='p-6 bg-white dark:bg-gray-700 rounded-3xl mt-4'>
        <h2 className='text-2xl font-bold mb-4 dark:text-white'>
          Shopping Cart
        </h2>

        {abandonedCarts && (
          <div className='bg-yellow-200 p-4 rounded'>
            🚀 You have abandoned carts! Complete your purchase now.
          </div>
        )}

        {cart.length === 0 ? (
          <div className='flex items-center justify-center h-96'>
            <p className='text-2xl font-bold'>🛒</p>
            <p className='text-gray-500'>Your cart is empty.</p>
          </div>
        ) : (
          <div className='shadow-lg rounded-lg p-6'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-200 text-left dark:bg-gray-600 dark:text-white rounded-lg'>
                  <th className='p-3'>Product</th>
                  <th className='p-3'>Quantity</th>
                  <th className='p-3'>Price</th>
                  <th className='p-3'>Total</th>
                  <th className='p-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: CartItem) => (
                  <tr
                    key={item.id}
                    className='border-b dark:border-gray-600 dark:text-white'>
                    <td className='p-3 flex items-center gap-2'>{item.name}</td>
                    <td className='p-3'>
                      <input
                        type='number'
                        min='1'
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: parseInt(e.target.value),
                            })
                          )
                        }
                        className='w-12 text-center border rounded'
                      />
                    </td>
                    <td className='p-3'>${item.price.toFixed(2)}</td>
                    <td className='p-3'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className='p-3'>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className='text-red-500 hover:underline'>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-between items-center mt-4'>
              <button
                onClick={() => dispatch(clearCart())}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'>
                Clear Cart
              </button>
              <h3 className='text-xl font-bold dark:text-white'>
                Total: ${total.toFixed(2)}
              </h3>
            </div>
            <div className='mt-6 text-right'>
              <Link
                to='/checkout'
                className='bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-700'>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
