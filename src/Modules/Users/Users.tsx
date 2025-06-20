import React, { useEffect, useState } from 'react'
import "../../styles/Users.css";
import { axiosInstance, ImageURL, USERS_URLS } from '../../services/Urls';
import type { Logged_in_Users } from '../../interfaces/Users';
import Loader from '../../shared/Loader'
import NoData from '../../shared/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import defaultImage from "../../assets/user-profile-icon-vector-avatar-600nw-2247726673.webp";

export default function Users() {
  const [loading,setLoading] = useState<boolean>(false)
  const [ShowDetails, setShowDetails] = useState<boolean>(false);
  const [User, setUser] = useState<Logged_in_Users>();
 const [showDeActivate, setShowDeActivate] = useState<boolean>(false);
 const [showActivate, setShowActivate] = useState<boolean>(false);
  const [userId , setUserId] = useState<number>(0)
  const handleCloseDeActivate = () => setShowDeActivate(false);

  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDetails = (id:number) => {
    setShowDetails(true);
    getSpecificUser(id)
  };

  const handleShowDeActivate = (id:number) => 
  {
    setShowDeActivate(true);
    setUserId(id)
  }

  const handleCloseActivate = () => setShowActivate(false);

  const handleShowActivate = (id:number) => {
    setShowActivate(true);
    setUserId(id)
  }


let [Users,setUsers] = useState<Logged_in_Users[]>([])
let [isLoading,setIsLoading] = useState<boolean>(false)

  const GetAllLoggedUsers = async(pageSize:number,pageNumber:number)=>{
    try{
      setIsLoading(true)
      let response = await axiosInstance.get(USERS_URLS.GET_LOGGED_IN_USERS, {
        params: { pageSize, pageNumber}})
      console.log(response.data.data);
      setUsers(response?.data?.data)
      setIsLoading(false)
    }
    catch(error){
      console.log(error);
      setIsLoading(false)
   
    }
  }

  const getSpecificUser = async(id:number)=>{
    try{
      setLoading(true)
      let response = await axiosInstance.get(USERS_URLS.GET_SPECIFIC_USER(id))
      console.log(response);
      setUser(response.data)
      setLoading(false)
    }
    catch(error){
      console.log(error);
      setLoading(false)
    }
  }


  const toggleActivatedEmployee = async() =>{
    try{
      setLoading(true)
      let response = await axiosInstance.put(USERS_URLS.TOGGLE_ACTIVATED_EMPLOYEE(userId))
      console.log(response);
      if(showActivate){
        toast.success('You have Activated this user successfully')

      }else{
        toast.success('You have Blocked this user successfully')
      }
      GetAllLoggedUsers(5,1)
      handleCloseActivate()
      handleCloseDeActivate()
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      console.log(error);
      
    }
  }


  useEffect(()=>{GetAllLoggedUsers(5,1)},[])
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

       {isLoading?(<Loader/>):( <table className="table table-striped table-hover table-bordered">
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
        {Users.length>0?(<tbody>
          {Users.map((user)=>(<tr>
            <td>{user?.userName}</td>
             <td>
                <span
                  className={`badge ${user.isActivated ? 'bg-success' : 'bg-danger'} m-auto d-block mt-2`}
                >
                  {user.isActivated ? 'Active' : 'Not Active'}
                </span>
              </td>
            <td>{user?.phoneNumber}</td>
            <td>{user?.email}</td>
            <td>{user?.creationDate && new Date(user.creationDate).toLocaleString()}</td>
            <td>
              <div className="dropdown">
                <button className="btn btn-link text-dark" data-bs-toggle="dropdown">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                <ul className="dropdown-menu">
                  {user?.isActivated? <li><button onClick={()=>{handleShowDeActivate(user.id)}} className="dropdown-item text-danger">Block</button></li>
                  : <li><button onClick={()=>{handleShowActivate(user.id)}} className="dropdown-item text-success">Activate</button></li>}
                 
                  <li><button onClick={()=>{handleShowDetails(user?.id)}} className="dropdown-item text-info">View</button></li>
                </ul>
              </div>
            </td>
          </tr>))}
          
        </tbody>):( <tbody>
          <tr>
            <td colSpan="6" className="text-center py-4">
              <NoData />
            </td>
          </tr>
        </tbody>)}
        
      </table>)}
       
    </div>
   
  <Modal show={showDeActivate} onHide={handleCloseDeActivate}>
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
          <i className="fa-solid fa-user-slash text-danger fa-2x mb-2"></i>
          Are You Sure You Want to Block This User?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeActivate}>
            Close
          </Button>
          <Button onClick={toggleActivatedEmployee} variant="danger">
           {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              </>
            ) : 'Block'}
          </Button>
        </Modal.Footer>
      </Modal>

  <Modal className='modal-dialog-centered' show={showActivate} onHide={handleCloseActivate}>
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
          <i className="fa-solid fa-user-check text-success fa-2x mb-2"></i>
          Are You Sure You Want to Activate This User?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActivate}>
            Close
          </Button>
          <Button onClick={toggleActivatedEmployee} variant="success">
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              </>
            ) : 'Activate'}
          </Button>
        </Modal.Footer>
      </Modal>


  


             <Modal show={ShowDetails} onHide={handleCloseDetails} centered>
              <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center gap-2">
                  <i className="fas fa-user text-primary"></i> User Details
                </Modal.Title>
              </Modal.Header>
            
              {loading ? (
                <div className="d-flex justify-content-center align-items-center gap-2 p-4">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </div>
              ) : (
                <Modal.Body>
                  <div className="text-center mb-3">
                    <img
                      className="img-fluid rounded-circle border"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      src={User?.imagePath ? `${ImageURL}${User.imagePath}` : defaultImage}
                      alt="User"
                    />
                  </div>
            
                  <div className="list-group">
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-id-badge text-secondary"></i> <strong>ID:</strong> {User?.id}
                    </div>
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-user text-primary"></i> <strong>Name:</strong> {User?.userName}
                    </div>
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-envelope text-danger"></i> <strong>Email:</strong> {User?.email}
                    </div>
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-globe text-success"></i> <strong>Country:</strong> {User?.country}
                    </div>
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-phone text-warning"></i> <strong>Phone:</strong> {User?.phoneNumber}
                    </div>
                    
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-calendar-plus text-success"></i> <strong>Created:</strong> {User?.creationDate && new Date(User.creationDate).toLocaleString()}
                    </div>
                    <div className="list-group-item d-flex align-items-center gap-2">
                      <i className="fas fa-calendar-check text-success"></i> <strong>Updated:</strong> {User?.modificationDate && new Date(User.modificationDate).toLocaleString()}
                    </div>
                  </div>
                </Modal.Body>
              )}
            
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetails}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


    </>
  )
}
