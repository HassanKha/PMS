import React from 'react'

export default function Loader() {
  return (
    <>
    <div className="text-center">
        <div className="spinner-border text-success mt-4 loading text-center" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  </>
  )
}
