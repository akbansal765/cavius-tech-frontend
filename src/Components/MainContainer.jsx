import Header from "./Header";
// import TaskForm from "./TaskForm";
// import TaskList from "./TaskList";
import { getTasksDB } from "../utils/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { lazy, Suspense } from 'react';
import spinnerGif from "../assets/spinner.gif"

const TaskForm = lazy(() => import("./TaskForm"));
const TaskList = lazy(() => import("./TaskList"));

// lazy fallback spinner
const spinner = (
  <div style={{ textAlign: 'center', padding: '2rem'}}>
    <img src={spinnerGif} alt="Loading..." width="80" />
  </div>
);

function MainContainer(){
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getTasksDB());
    }, [dispatch])
    
    return (
        <div className="mainContainer_component">
           <Header />
           <div className="taskForm_taskList_box">
             <Suspense fallback={spinner}><TaskForm /></Suspense>
             <Suspense fallback={spinner}><TaskList /></Suspense>
           </div>
        </div>
    )
}

export default MainContainer;