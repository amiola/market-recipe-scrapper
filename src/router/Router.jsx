import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Purchase from '../pages/Purchase'
import Resume from '../pages/Resume'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/purchase/:number' element={<Purchase/>}/>
        <Route path='/resume/:number' element={<Resume/>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
    </Routes>
    </>
  )
}

export default Router