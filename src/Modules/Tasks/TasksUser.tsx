
import { useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";
import Header from "../../shared/Header";
import './../../styles/TasksUser.css'
import { toast } from "react-toastify";


function TasksUser() {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });


  async function getAllAssignedTasks() {
    try {
      let response = await axiosInstance.get(`${TASKS_URLS.GET_ASSIGNED_TASKS}?pageSize=5&pageNumber=1`);
      setTasks(response.data.data);

    } catch (error: any) {
      console.log(error);
    }

  }
  const toDoTasks = tasks.filter(task => task.status === "ToDo");
  const inProgressTasks = tasks.filter(task => task.status === "InProgress");
  const doneTasks = tasks.filter(task => task.status === "Done");

  async function taskUser() {
    try {
      let response = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
      setTaskCount(response.data);

    } catch (error: any) {
     toast.error(error.response?.data?.message || "Something went wrong");  
    }

  }
  useEffect(() => {
    taskUser();
    getAllAssignedTasks();
  }, []);
  return (
    <>
      <div className="tasksUsers">
        <Header Title="Task Board" BtnTitle="Create Task" />
        <div className="py-5 container">
          <div className="row ">
            <div className="col-md-4">
              <h5 className="mt-3 text-center">
                TO DO <span className="text-info">({toDoTasks.length})</span>
              </h5>
              <div id="toDo" className="itemTask">
                {toDoTasks.map((task: any) => (
                  <div  draggable="true" key={task.id} className="itemTaskUser">
                    <p>{task.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="inProgress" className="col-md-4">
              <h5 className="mt-3 text-center">In progress  <span className="text-warning">({taskCount.inProgress})</span></h5>
              <div className="itemTask">
                {inProgressTasks.map((task: any) => (
                  <div  draggable="true" key={task.id} className="itemTaskUser">
                    <p >{task.title}</p>
                  </div>
                ))}
              </div>

            </div>
            <div  id="done" className="col-md-4">
              <h5 className="mt-3 text-center">Done <span className="text-success">({taskCount.done})</span></h5>
              <div className="itemTask">
                {doneTasks.map((task: any) => (
                  <div  draggable="true" key={task.id} className="itemTaskUser">
                    <p >{task.title}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TasksUser