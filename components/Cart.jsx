import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lip/client';
import Product from './Product';


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice,toggleCartQuantity, totalQuantities, setShowCart,carItems,onRemove,iindex} = useStateContext();
  
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
        type='button'
        className='cart-heading'
        onClick={()=> setShowCart(false)}>
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {carItems.length === 0 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {carItems.length !==0 &&carItems.map((item) =>(
            <div className='product' key={item._id}>
              <picture>
              <img src={urlFor(item.image[iindex])}
              alt={item.name} className='cart-product-image'/>
              </picture>
              <div className='item-desc'>
                <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div >

                  <p className="quantity-desc">
              <span className="minus" onClick={()=>toggleCartQuantity(item._id,'dec')}><AiOutlineMinus /></span>
              <span className="num">{item.quantity}</span>
              <span className="plus" onClick={()=>toggleCartQuantity(item._id,'inc')}><AiOutlinePlus /></span>
                </p>
                  </div>
                  <button
                  type='button'
                  className='remove-item'
                  onClick={()=>onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {carItems.length !==0 &&(
          <div className='cart-bottom'>
            <div className='total'>
                <h3>subtotal :</h3>
                <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <Link href='/success'>
              <button className='btn' type='button'onClick={() => setShowCart(false)}> Pay Now</button>
              </Link>
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
