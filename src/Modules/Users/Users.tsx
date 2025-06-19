import React, { useEffect, useState } from 'react'
import "../../styles/Users.css";
import { axiosInstance, USERS_URLS } from '../../services/Urls';
import type { Logged_in_Users } from '../../interfaces/Users';
import { toast } from 'react-toastify/unstyled';

export default function Users() {
let [Users,setUsers] = useState<Logged_in_Users[]>([])
let [isLoading,setIsLoading] = useState<boolean>(false)

  const GetAllLoggedUsers = async()=>{
    try{
      setIsLoading(true)
      let response = await axiosInstance.get(USERS_URLS.GET_LOGGED_IN_USERS)
      console.log(response.data.data);
      setUsers(response?.data?.data)
      setIsLoading(false)
    }
    catch(error){
      console.log(error);
      setIsLoading(false)
   
    }
  }


  useEffect(()=>{GetAllLoggedUsers()},[])
  return (
    <>
    <div className='bg-light shadow py-3'>
        <h1 className='fw-bold container'>Users</h1>
    </div>
    <div className='container bg-white mt-3'>
      <div className='p-2 d-flex gap-2'>
            <div className="position-relative w-25">
              <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
              <input
                type="text"
                className="form-control rounded-pill ps-5"
                placeholder="Search Fleets"
              />
            </div>
             <button className="btn btn-outline-secondary rounded-pill d-flex align-items-center px-3">
              <i className="fas fa-filter me-2"></i>
              Filter
            </button>
       </div>

       
        <table className="table table-striped table-hover table-bordered">
        <thead className="">
          <tr>
            <th>User Name <i className="fas fa-sort ms-1 text-black"></i></th>
            <th>Status <i className="fas fa-sort ms-1 text-black"></i></th>
            <th>Phone Number <i className="fas fa-sort ms-1 text-black"></i></th>
            <th>Email <i className="fas fa-sort ms-1 text-black"></i></th>
            <th>Date Created <i className="fas fa-sort ms-1 text-black"></i></th>
            <th>Actions <i className="fas fa-sort ms-1 text-black"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Upskilling</td>
            <td><span className="badge bg-success m-auto d-block mt-2">Active</span></td>
            <td>01124323245</td>
            <td>Upskilling.eg1@gmail.com</td>
            <td>09-23-2023</td>
            <td>
              <div className="dropdown">
                <button className="btn btn-link text-dark" data-bs-toggle="dropdown">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item bg-danger">Block</button></li>
                  <li><button className="dropdown-item bg-info">View</button></li>
                </ul>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
   
   
    </>
  )
}
