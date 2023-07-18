import React, { useContext } from 'react'
import Context from '../context/Context'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = () => {

  const provider = useContext(Context)
  // const navigation = useNavigate()

  return (
    <>
    <section className="home">
        <NavLink to='/purchase' >Go To purchase</NavLink>
    </section>
    </>
  )
}

export default Home