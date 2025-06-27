
import { useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";
import Header from "../../shared/Header";
import './../../styles/TasksUser.css'
import { toast } from "react-toastify";
import { type Task } from './../../interfaces/Tasks';
import { LoadingSpin } from "../../assets/SVGIcons/SpinnerIcon";


function TasksUser() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState<{
    toDo: number;
    inProgress: number;
    done: number;
  }>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
  const [loading, setLoading] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<Number | null>(null);

  async function getAllAssignedTasks() {
    setLoading(true);
    try {
      let response = await axiosInstance.get(`${TASKS_URLS.GET_ASSIGNED_TASKS}?pageSize=5&pageNumber=1`);
      setTasks(response.data.data);
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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

  const handleDrop = async (newStatus: string) => {
    console.log(newStatus)
    if (!draggedTaskId) return;

    const task = tasks.find((t) => t.id === Number(draggedTaskId));
    if (!task || task.status === newStatus) return;

    try {
      // Replace with your actual API call
      await axiosInstance.put(`${TASKS_URLS.UPDATE_ASSIGNED_TASK(draggedTaskId)}`, {
        status: newStatus,
      });

      toast.success(`Task moved to ${newStatus}`);

      // Update local state to reflect change
      const updatedTasks = tasks.map((t) =>
        t.id === draggedTaskId ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);
      taskUser(); // Refresh counts
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setDraggedTaskId(null);
    }
  };

  const handleDragStart = (id: Number) => {
    setDraggedTaskId(id);
    console.log('start')
  };


  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('dro[')
  };
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
              <div id="toDo"
                className="itemTask"
                onDragOver={allowDrop}
                onDrop={() => handleDrop("ToDo")}>

                {loading ? <div className="w-100 d-flex justify-content-center align-items-center"><LoadingSpin /></div> : toDoTasks.map((task: Task) => (
                  <div draggable="true" key={task.id} onDragStart={() => handleDragStart(task.id)} className="itemTaskUser">
                    <p>{task.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="inProgress" onDrop={() => handleDrop("InProgress")} onDragOver={allowDrop} className="col-md-4">
              <h5 className="mt-3 text-center">In progress  <span className="text-warning">({taskCount.inProgress})</span></h5>
              <div className="itemTask">
                {loading ? <div className="w-100 d-flex justify-content-center align-items-center"><LoadingSpin /></div> : inProgressTasks.map((task: any) => (
                  <div onDragStart={() => handleDragStart(task.id)} draggable="true" key={task.id} className="itemTaskUser">
                    <p >{task.title}</p>
                  </div>
                ))}
              </div>

            </div>
            <div id="done" onDrop={() => handleDrop("Done")} onDragOver={allowDrop} className="col-md-4">
              <h5 className="mt-3 text-center">Done <span className="text-success">({taskCount.done})</span></h5>
              <div className="itemTask">
                {loading ? <div className="w-100 d-flex justify-content-center align-items-center"><LoadingSpin /></div> : doneTasks.map((task: any) => (
                  <div onDragStart={() => handleDragStart(task.id)} draggable="true" key={task.id} className="itemTaskUser">
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