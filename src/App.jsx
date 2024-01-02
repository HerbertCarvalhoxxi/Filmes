import { useState } from 'react'
import RoutesApp from './routes'
import ContextProvider from '../src/context'

function App() {

  return (
    <>
    <ContextProvider>
      <RoutesApp/>
    </ContextProvider>
    </>
  )
}

export default App
