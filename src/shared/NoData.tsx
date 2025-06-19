import nodata from '../assets/no-data.webp'
export default function NoData() {
  return <>
  <div className='d-flex flex-column justify-content-center align-items-center'>
    <img src={nodata} alt="no-data" className='w-100'/>
     <h5 className='mb-5'>No data avaliable!</h5>
  </div>
  
  </>;
}