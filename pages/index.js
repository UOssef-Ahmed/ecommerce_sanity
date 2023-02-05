import React from 'react'
import {client} from '../lip/client'
import{Product,Layout,HeroBanneer, FooterBanneer}from '../components'
export default function Home({bannerData,products}) {
  return (
    <div>
     <HeroBanneer heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
          <h2>BEST SELLER PRODUCT</h2>
          <p>Spekers there are many variations passagese</p>
      </div>
      <div className='products-container'>
        {products?.map((product)=> <Product key={product._id} product={product}/>  )}
      </div>
      <FooterBanneer footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}
export const getServerSideProps=async()=>{
  const query='*[_type == "product"]';
  const products =await client.fetch(query)

  const bannerQuery='*[_type == "banner"]';
  const bannerData =await client.fetch(bannerQuery)

return{
  
  props:{bannerData,products}
}
}


