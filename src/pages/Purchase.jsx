import React, { useContext } from 'react'
import Context from '../context/Context'

const Purchase = () => {

  const provider = useContext(Context)

  return (
    <>
    <section className="purchase">
      {provider.purchase.date && <div className="date-time">
        <h2>Date: {provider.purchase.date}</h2>
        <h2>Time: {provider.purchase.time}</h2>
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
      {provider.purchase.uniqueProducts && provider.purchase.uniqueProducts.map((product,i)=>(
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
      {provider.purchase.totalValue && <div className="total">
       <h2>Total Value: R$ {provider.purchase.totalValue.toFixed(2)}</h2>
      </div>}
    </section>
    </>
  )
}

export default Purchase