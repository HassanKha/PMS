import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import TasksList from "../Modules/Tasks/TasksList";
import TasksUser from "../Modules/Tasks/TasksUser";


const ProtectedTasksRoute = () => {
  const auth = useContext(AuthContext);
  if( auth?.LoginData && auth?.LoginData?.roles[0] === 'Manager' )
  {
    return <TasksList/>;
  }
  return <TasksUser/>;
};
export default ProtectedTasksRoute;