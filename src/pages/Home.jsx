import React, { useContext } from 'react'
import Context from '../context/Context'
import { NavLink } from 'react-router-dom'

const Home = () => {

  const provider = useContext(Context)

  return (
    <>
    <section className="home">
      <h1>Credit card resumes:</h1>
      <h1>Nubank</h1>
      <div className="resumes">
      <NavLink to='/total-resume/nubank'><div className='resume-link btn'>
        <h3>Total Resume</h3>
        </div></NavLink>
      {provider.nubankPeriods && provider.nubankPeriods.map((resume,i)=>(
        <NavLink to={`/credit-resume/nubank/${i}`} key={i}><div className='resume-link btn'>
        <h3>Resume {resume.period}</h3>
        {/* <h2>Total: R$ {resume.totalValue.toFixed(2)}</h2> */}
        </div></NavLink>
      ))}
      </div>
      <h1>Santander</h1>
      <div className="resumes">
      <NavLink to='/total-resume/santander'><div className='resume-link btn'>
        <h3>Total Resume</h3>
        </div></NavLink>
      {provider.santanderPeriods && provider.santanderPeriods.map((resume,i)=>(
        <NavLink to={`/credit-resume/santander/${i}`} key={i}><div className='resume-link btn'>
        <h3>Resume {resume.period}</h3>
        {/* <h2>Total: R$ {resume.totalValue.toFixed(2)}</h2> */}
        </div></NavLink>
      ))}</div>
      <h1>Resumes:</h1>
      <div className="resumes">
      {provider.resumes && provider.resumes.map((resume,i)=>(
        <NavLink to={`/resume/${i}`} key={i}><div className='resume-link btn'>
        <h3>Resume {resume.month}</h3>
        <h2>Total: R$ {resume.totalValue.toFixed(2)}</h2>
        </div></NavLink>
      ))}</div>
      <h1>Purchases:</h1>
      <div className="purchases">
      {provider.months && provider.months.map((month,i)=>(
        <div className="month">
          <h2>{month.month}:</h2>
          <div className="links">
          {provider.purchases && provider.purchases.map((purchase,i)=>(
          <NavLink to={`/purchase/${i}`} key={i}><div className='purchase-link btn'>
            <h3>Date: {purchase.date}</h3>
            <h3>Time: {purchase.time}</h3>
            <h2>Total: R$ {purchase.totalValue.toFixed(2)}</h2>
            </div></NavLink>
        ))}
        </div>
        </div>
      ))}
      </div>
    </section>
    </>
  )
}

export default Home