import { useState } from "react";
import { addTask, createTaskDB } from "../utils/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";

function TaskForm(){
    const dispatch = useDispatch();
    const theme = useSelector(store => store.tasks.isLightThemeOn);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    function handleCreateTask(e){
        e.preventDefault();
        const task = {taskId: uuidv4(), title, description, status, priority, taskDate: dayjs().format("YYYY-MM-DDTHH:mm")};
        if(!title || !description || !status || !priority){
          alert("Kindly Fill all the fields");
          return;
        }
        dispatch(addTask(task));

        dispatch(createTaskDB(task));
    }

    return (
        <div className={`taskForm_component ${theme ? "light_back" : ""}`}>
          <div className="taskForm_container">
            <form className="createTaskForm" onSubmit={handleCreateTask}>
               <input className={`taskForm_title_input ${theme ? "light_back_color" : ""}`} type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
               <textarea className={`taskForm_desc_textArea ${theme ? "light_back_color" : ""}`} placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
               <select className={`taskForm_status_filter ${theme ? "light_back_color" : ""}`} value={status} onChange={(e) => setStatus(e.target.value)}>
                 <option value="" disabled>Status</option>
                 <option value="Not started">Not Started</option>
                 <option value="In progress">In progress</option>
                 <option value="On hold">On hold</option>
                 <option value="Cancelled">Cancelled</option>
                 <option value="Completed">Completed</option>
               </select>
               <select className={`taskForm_priority_filter ${theme ? "light_back_color" : ""}`} value={priority} onChange={(e) => setPriority(e.target.value)}>
                 <option value="" disabled>Priority</option>
                 <option value="Low">Low</option>
                 <option value="Medium">Medium</option>
                 <option value="Critical">Critical</option>
               </select>
               <button className="taskForm_createTask_btn">Create task</button>
            </form>
          </div>
        </div>
    )
}

export default TaskForm;