import React, { useContext, useState, useEffect} from 'react'
import Context from '../context/Context'
import { useParams } from 'react-router-dom'

const TotalCredit = () => {

    const provider = useContext(Context)
    const {bank}=useParams()
    const [purch, setPurch]=useState()

    const init = ()=>{
            switch (bank) {
              case 'nubank':
                setPurch(provider.nubankPurch)
                break;
              case 'santander':
                setPurch(provider.santanderPurch)
                break;
            }
          }
    

    useEffect(()=>{
        init() 
      },[])

  return (
    <>
    <section className="resume">
      <div className="text">
      {purch && <div className="date-time">
        <h2>{bank} Total</h2>
        </div>}
      </div>
      <table>
        <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Date</th>
          {/* <th>Category</th> */}
          {/* <th>Subcategory</th> */}
          <th>Price</th>
          <th>Parcela</th>
          {/* <th>Total Value</th> */}
      </tr>
      </thead>
      <tbody>
      {purch && purch.map((purchase,i)=>(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{purchase.description}</td>
          <td>{provider.formatDate(purchase.date)}</td>
          {/* <td>{product.category}</td> */}
          {/* <td>{product.subcategory}</td> */}
          <td>R$ {purchase.price}</td>
          <td>{purchase.parcela}</td>
          {/* <td>R$ {product.vTotal}</td> */}
        </tr>
      ))}
      </tbody>
      </table>
      <button className='export-btn btn' onClick={()=>provider.handleExport(purch)}>Export Table</button>
    </section>
    </>
  )
}

export default TotalCredit