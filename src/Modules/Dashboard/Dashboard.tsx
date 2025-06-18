import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";




function Dashboard() {
    const auth = useContext(AuthContext);
 useEffect(() => {
   auth?.SaveLoginData()
  }, []);

  return (
    <>
    <div className="m-5">Dashboard</div>

    </>
  )
}

export default Dashboard