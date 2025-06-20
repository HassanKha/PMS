
import notFoundImg from '../assets/not-found.svg'

export default function NotFound() {
  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <img className='w-50' src={notFoundImg} alt=""  />
         <h1 className='fw-bold'>Not Found</h1>
      </div>
    </>
  )
}
