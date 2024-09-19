import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/SignUp'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'

// 
// <AppBar />
// <Balance value={'10000'} />
// <Users/>
// <SendMoney />
function App() {
 

  return (
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin />}></Route>
       <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/sendmoney' element={<SendMoney />}></Route>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
