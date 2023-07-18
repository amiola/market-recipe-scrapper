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
            <h2>Date: {purchase.date}</h2>
            <h2>Time: {purchase.time}</h2>
            <h1>Total: R$ {purchase.totalValue.toFixed(2)}</h1>
            </div></NavLink>
        ))}
      </div>
        
    </section>
    </>
  )
}

export default Home