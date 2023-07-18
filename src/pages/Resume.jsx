import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context'
import { useParams } from 'react-router-dom'

const Resume = () => {

  const provider = useContext(Context)
  const {number}=useParams()

  const [resume,setResume]=useState({})

  useEffect(()=>{
    init() 
  },[])

  // useEffect(()=>{
  //   console.log(resume)
  // },[resume])

  const init = ()=>{
    setResume(provider.resumes[number])
  }

  return (
    <>
    <section className="resume">
      <div className="text">
      {resume && <div className="date-time">
        <h2>Month: {resume.month}</h2>
        </div>}
        {resume.totalValue && <div className="total">
       <h2>Total Value: R$ {resume.totalValue.toFixed(2)}</h2>
      </div>}
      </div>
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
      {resume.products && resume.products.map((product,i)=>(
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
      <button className='export-btn btn' onClick={()=>provider.handleExport(resume.products)}>Export Table</button>
    </section>
    </>
  )
}

export default Resume