import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lip/client'


const Product = ({product:{image,name,slug,price,}}) => {
  
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
      <div className='product-card'>
      <picture>
        <img className='product-image' src={urlFor(image&&image[0])} alt={name} width={250} height={250}/>
      </picture>
      <p className='product-name'>{name}</p>
      <p className='product-price'>${price}</p>
      </div>
      </Link>
    </div>
  )
}

export default Product
