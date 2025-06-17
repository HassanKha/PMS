import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'


function Dashboard() {
  let navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
    <div>Dashboard</div>
     <NavLink className="btn bg-warning" to={'/change-password'}>Change Password</NavLink>
     <Button onClick={logout} className='btn bg-danger ms-2'>Logout</Button>
    </>
  )
}

export default Dashboard