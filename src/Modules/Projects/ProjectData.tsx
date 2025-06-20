import { useForm, type FieldError } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { axiosInstance, PROJECTS_URLS } from "../../services/Urls"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


function ProjectData() {
  let [loading, setLoading] = useState(false)
  let { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  let navigate = useNavigate()
  const location = useLocation()
  const data = location.state
  console.log(data);

  const isEdit = !!data;
  const PojectId = data?.id;



  async function onSubmit(data: any) {



    setLoading(true)
    try {
      if (isEdit) {
        let resonse = await axiosInstance.put(PROJECTS_URLS.EDIT_PROJECT(PojectId), data)
        setLoading(false)
        reset()
        toast.success(resonse.data.message || "Project updated successfully");
      }
      else {
        let response = await axiosInstance.post(PROJECTS_URLS.ADD_PROJECT, data)
        console.log(response);
        setLoading(false)
        reset()
        toast.success(response.data.message || "Project added successfully");
      }

      navigate("/dashboard/projects")

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
      // Show success message and navigate back to projects page
    }
  }
  ;
  useEffect(() => {

    if (isEdit) {
      setValue("title", data.title);
      setValue("description", data.description);
    }

  }, [])
  return (
    <>
      <div className="AllPageFormProjects">
        <div className="container">
          <div className="headerProject p-3 ">
            <Link to="/dashboard/projects" className="text-decoration-none text-black"> <i className="fa-solid fa-chevron-left mx-1"></i> View All Projects</Link>
            <h3>Add a New Project</h3>
          </div>
          <div className="formProjects py-4 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder="Title"
                  type="text"
                  id="inputTitle"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                />
                {errors.title && (
                  <span className="text-danger">
                    {(errors.title as FieldError).message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="inputDesc" className="form-label">Description</label>
                <textarea {...register("description", { required: "Description is required" })} id="inputDesc" className="form-control" placeholder="Description"></textarea>
                {errors.description && (
                  <span className="text-danger">
                    {(errors.description as FieldError).message}
                  </span>
                )}
              </div>

              <div className="btnFormProjects d-flex justify-content-between align-items-center mt-4">
                <button onClick={() => { navigate("/dashboard/projects") }} className="btn_CancelForm ">Cancel</button>
                <button type="submit" className=" btnSaveProject">{loading ? <i className='fa fa-spinner fa-spin'></i> : isEdit ? "Update" : "Save"}</button>

              </div>

            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProjectData