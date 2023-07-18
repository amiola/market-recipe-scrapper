import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { useParams } from 'react-router-dom'

const Purchase = () => {

  const provider = useContext(Context)
  const {number}=useParams()

  const [purchase,setPurchase]=useState({})

  useEffect(()=>{
    init() 
  },[])


  const init = ()=>{
    setPurchase(provider.purchases[number])
  }

  return (
    <>
    <section className="purchase">
      {purchase && <div className="date-time">
        <h2>Date: {purchase.date}</h2>
        <h2>Time: {purchase.time}</h2>
        </div>}
      <table>
        <thead>
        <tr>
          <th>Item</th>
          <th>Code</th>
          <th>Name</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Unit Value</th>
          <th>Total Value</th>
      </tr>
      </thead>
      <tbody>
      {purchase.uniqueProducts && purchase.uniqueProducts.map((product,i)=>(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{product.code}</td>
          <td>{product.name}</td>
          <td>{product.unit}</td>
          <td>{product.quan}</td>
          <td>R$ {product.vUnit}</td>
          <td>R$ {product.vTotal}</td>
        </tr>
      ))}
      </tbody>
      </table>
      {purchase.totalValue && <div className="total">
       <h2>Total Value: R$ {purchase.totalValue.toFixed(2)}</h2>
      </div>}
    </section>
    </>
  )
}

export default Purchase