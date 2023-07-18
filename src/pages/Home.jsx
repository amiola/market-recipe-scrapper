import React, { useContext } from 'react'
import Context from '../context/Context'
import { NavLink } from 'react-router-dom'

const Home = () => {

  const provider = useContext(Context)

  return (
    <>
    <section className="home">
    <h1>Purchases:</h1>
      <div className="purchases">
      {provider.purchases && provider.purchases.map((purchase,i)=>(
          <NavLink to={`/purchase/${i}`} key={i}><div className='purchase-link btn'>
            <h3>Date: {purchase.date}</h3>
            <h3>Time: {purchase.time}</h3>
            <h2>Total: R$ {purchase.totalValue.toFixed(2)}</h2>
            </div></NavLink>
        ))}
      </div>
      <h1>Resumes:</h1>
      <div className="resumes">
      {provider.resumes && provider.resumes.map((resume,i)=>(
        <NavLink to={`/purchase/1`} key={i}><div className='resume-link btn'>
        <h3>Resume</h3>
        </div></NavLink>
      ))}</div>
    </section>
    </>
  )
}

export default Home