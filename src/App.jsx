import React, { useState } from 'react'
import Provider from './context/Provider'
import Router from './router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider>
        <Router/>
      </Provider>
    </>
  )
}

export default App
