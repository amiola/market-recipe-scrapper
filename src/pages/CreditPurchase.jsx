import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { useParams } from 'react-router-dom'

const CreditPurchase = () => {

  const provider = useContext(Context)
  const {number, bank}=useParams()

  const [resume,setResume]=useState({})

  useEffect(()=>{
    init() 
  },[])

  // useEffect(()=>{
  //   console.log(resume)
  // },[resume])

  const init = ()=>{
    switch (bank) {
      case 'nubank':
        setResume(provider.nubankPeriods[number])
        break;
      case 'santander':
        setResume(provider.santanderPeriods[number])
        break;
    }
  }

 

  return (
    <>
    <section className="resume">
      <div className="text">
      {resume && <div className="date-time">
        <h2>Period: {resume.period}</h2>
        </div>}
        {/* {resume.totalValue && <div className="total">
       <h2>Total Value: R$ {resume.totalValue.toFixed(2)}</h2>
      </div>} */}
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
      {resume.purchases && resume.purchases.map((purchase,i)=>(
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
      <button className='export-btn btn' onClick={()=>provider.handleExport(resume.purchases)}>Export Table</button>
    </section>
    </>
  )
}

export default CreditPurchase