import React from 'react'
import { Outlet } from 'react-router-dom'

function MasterLayout() {
  return (
    <>
    
   <h1>MasterLayout</h1> 
   <Outlet/>
    </>
  )
}

export default MasterLayout