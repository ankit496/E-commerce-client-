import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItems, deleteItemFromCartAsync, fetchItemsByUserIdAsync, updateCartAsync } from './cartSlice';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link,Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../auth/authSlice';
import { discountedPrice } from '../../app/constants';

export default function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const items=useSelector(cartItems)
  const user=useSelector(selectLoggedInUser)
  const [open, setOpen] = useState(true);
  let totalAmount=0;
  for(let i in items){
    let dicountAmount=discountedPrice(items[i].product)
    totalAmount+=dicountAmount*items[i].quantity
  }
  const totalitems=items.reduce((total,items)=>items.quantity+total,0)
  const handleQuantity=(e,items)=>{
    dispatch(updateCartAsync({id:items.id,quantity:+e.target.value}))
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>
      {items.length==0 && <Navigate to='/' replace={true}></Navigate>}
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <div>
                            <p className="ml-4 line-through">${item.product.price}</p>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={(e)=>handleRemove(e,item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Total items in Cart</p>
              <p>{totalitems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
            <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or 
                <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  &nbsp;Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
