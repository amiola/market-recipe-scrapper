import React, { useContext } from 'react'
import Context from '../context/Context'

const Home = () => {

  const provider = useContext(Context)

  return (
    <>
    <section className="home">
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
      {provider.products.map((product,i)=>(
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
      <div className="total">
        Total Value: R$ {provider.totalValue}
      </div>
    </section>
    </>
  )
}

export default Home