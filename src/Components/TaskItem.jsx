import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask, deleteTaskDB, updateTaskDB } from "../utils/taskSlice";
import { useState } from "react";
import dayjs from "dayjs";

function TaskItem({task}){

    const dispatch = useDispatch();
    const theme = useSelector(store => store.tasks.isLightThemeOn);
    const [isEdit, setIsEdit] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);

    function handleDeleteTask(){
        dispatch(deleteTask(task.taskId));

        dispatch(deleteTaskDB(task.taskId));
    }

    async function handleUpdateTask(e){
        e.preventDefault();
        const updatedTask = {taskId: task.taskId, title, description, status, priority, taskDate: dayjs().format("YYYY-MM-DDTHH:mm")}

        dispatch(updateTask(updatedTask));

        try{
           // awaiting thunk middleware promise
           const payload = await dispatch(updateTaskDB(updatedTask)).unwrap();
           alert(payload.message || "Task has been updated")

           setIsEdit(false);
        }catch(err){
           alert(err || "Unable to Update the Task!")
        }
    }

    return (
        <div className={`taskItem_component ${theme ? "light_back_color_span" : ""}`}>
          {!isEdit &&
             <>
               <p className="taskitem_title">Title: <span>{task?.title}</span></p>
               <p className="taskitem_desc">Description: <span>{task?.description}</span></p>
               <p className="taskitem_status">Status: <span>{task?.status}</span></p>
               <p className="taskitem_priority">Priority: <span>{task?.priority}</span></p>
               <p className="taskitem_date">Date: <span>{dayjs(task?.taskDate).format("MMMM D, YYYY h:mm A")}</span></p>
             </>
          }
          {isEdit &&
            <form className="taskItem_edit_form" onSubmit={handleUpdateTask}>
               <input className={`taskItem_edit_input_title ${theme ? "light_back_color" : ""}`} type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
               <textarea className={`taskItem_edit_textArea_desc ${theme ? "light_back_color" : ""}`} placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
               <select className={`taskItem_edit_status_filter ${theme ? "light_back_color" : ""}`} value={status} onChange={(e) => setStatus(e.target.value)}>
                 <option value="" disabled>Status</option>
                 <option value="Not started">Not Started</option>
                 <option value="In progress">In progress</option>
                 <option value="On hold">On hold</option>
                 <option value="Cancelled">Cancelled</option>
                 <option value="Completed">Completed</option>
               </select>
               <select className={`taskItem_edit_priority_filter ${theme ? "light_back_color" : ""}`} value={priority} onChange={(e) => setPriority(e.target.value)}>
                 <option value="" disabled>Priority</option>
                 <option value="Low">Low</option>
                 <option value="Medium">Medium</option>
                 <option value="Critical">Critical</option>
               </select>
               <br />
               <button className="taskItem_updateTask_btn">Update task</button>
            </form>
          }
          {!isEdit && <button className="taskItem_delete_btn" onClick={handleDeleteTask}>Delete</button>}
          {!isEdit && <button className="taskItem_edit_btn" onClick={() => setIsEdit(true)}>Edit</button>}
          {isEdit && <button className="taskItem_cancel_edit_btn" onClick={() => setIsEdit(false)}>Cancel</button>}
        </div>
    )
}

export default TaskItem;