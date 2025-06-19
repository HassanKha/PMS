

function ProjectList() {
  return (
    <>
      <div className="header_Project w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h2>Projects</h2>
          <button >
            <i className="fa-solid fa-plus"></i> Add New Project
          </button>
        </div>

        <div className="container-fluid bg-white">

          <div className="position-relative search_Projects">
            <i className="fa-solid fa-magnifying-glass position-absolute" style={{
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#999',
            }}></i>
            <input
              type="text"
              className="form-control ps-5 rounded-pill"
              placeholder="Search By Title"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </div>
          <table className="text-center table table-striped mt-3 table-projects table-hover table-responsive-md table-responsive-sm">
            <thead>
              <tr >
                <th scope="col">Title </th>
                <th scope="col">Statues</th>
                <th scope="col">Num Users</th>
                <th scope="col">Num Tasks</th>
                <th scope="col">Date Created</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              <tr className="align-middle">
                <td>Project A</td>
                <td ><button className="statues_Project">Active</button> </td>
                <td>5</td>
                <td>10</td>
                <td>2023-06-01</td>

                <td>
                  <div className="action">
                    <div className="dropdown">
                      <a className="btn fs-4 dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                      </a>
                      <div className="actionBtn">

                        <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">

                          <li ><span className="dropdown-item" > <i className=" p-2 fa-solid fa-eye"></i>View</span></li>
                          <li ><span className="dropdown-item" ><i className=" p-2 fa-solid fa-pen-to-square"></i>Edit</span></li>
                          <li ><span className="dropdown-item " ><i className="p-2 fa-solid fa-trash"></i>Delete</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td>Project A</td>
                <td ><button className="statues_Project">Active</button> </td>
                <td>5</td>
                <td>10</td>
                <td>2023-06-01</td>

                <td>
                  <div className="action">
                    <div className="dropdown">
                      <a className="btn fs-4 dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                      </a>
                      <div className="actionBtn">

                        <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                          <li ><span className="dropdown-item" > <i className=" p-2 fa-solid fa-eye"></i>View</span></li>
                          <li ><span className="dropdown-item" ><i className=" p-2 fa-solid fa-pen-to-square"></i>Edit</span></li>
                          <li ><span className="dropdown-item " ><i className="p-2 fa-solid fa-trash"></i>Delete</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>



        </div>
      </div>

    </>
  )
}

export default ProjectList