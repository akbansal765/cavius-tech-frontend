import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTasksDB } from "../utils/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


function MainContainer(){
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getTasksDB());
    }, [dispatch])
    
    return (
        <div className="mainContainer_component">
           <Header />
           <div className="taskForm_taskList_box">
             <TaskForm />
             <TaskList />
           </div>
        </div>
    )
}

export default MainContainer;