import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context =createContext();

export const StateContext =({children})=> {
    const [showCart,setShowCart]=useState(false)
    const [carItems,setCarItem]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty,setQty]=useState(1)
    const [iindex,setIIndex]=useState(0)
    
    const incQty=()=>setQty((num)=>num+1)
    const decQty=()=>setQty((num)=>num-1 < 1?1:num-1)
    let foundProduct;
    let index;

    const onAdd= (product,quantity)=>{
        
        const checkProductIncart=carItems.find((item)=>item._id === product._id)

        setTotalPrice((prevTotalPrice)=> prevTotalPrice+product.price*quantity)
       setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+quantity)

       if(checkProductIncart){
           const upDatedCartItems=carItems.map((cartProduct)=>{
            if(cartProduct._id===product._id) return{...cartProduct,quantity:cartProduct.quantity + quantity}
           })
           
           setCarItem(upDatedCartItems);
           
        }else{
            product.quantity = quantity;
      
            setCarItem([...carItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }  
    
    const onRemove = (product) => {
        foundProduct = carItems.find((item) => item._id === product._id);
        const newCartItems = carItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCarItem(newCartItems);
    }

    const toggleCartQuantity=(id,value)=>{
        foundProduct=carItems.find((item)=>item._id===id)
        index=carItems.findIndex((product)=>product._id===id)
        
        const newCartItems=carItems.filter((item)=>item._id!==id)
        const clone=[...newCartItems]
        const clone2=[...newCartItems]
        
        if(value==='inc'){
            clone.splice(index, 0, {...foundProduct,quantity:foundProduct.quantity+1});
            setCarItem([...clone])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity+1)
        }else if(value==='dec'){
            if(foundProduct.quantity > 1){
            
            clone2.splice(index, 0, {...foundProduct,quantity:foundProduct.quantity-1});
            setCarItem([...clone2])
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity-1)

            }
        }
    }
    return(
        <Context.Provider 
        value={{
            showCart,
            setShowCart,
            carItems,
            setCarItem,
            totalPrice,
            totalQuantities,
            qty,
            setQty,
            incQty,
            decQty,
            onAdd,
            toggleCartQuantity,
            onRemove,
            setTotalPrice,
            setTotalQuantities,
            iindex,
            setIIndex
        }}
        >

            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);