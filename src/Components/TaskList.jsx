import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";

function TaskList(){
    const [tasks, setTasks] = useState([]);

    const items = useSelector(store => store.tasks.items);
    const theme = useSelector(store => store.tasks.isLightThemeOn);

    function handleSearchByTitle(e){
        const filteredTasks = items.filter(task =>
          task.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setTasks(filteredTasks);
    }

    function handleStatusFilter(e){
        const filteredTasks = items.filter(task => task.status == e.target.value);
        setTasks(filteredTasks);
    }

    function handlePriorityFilter(e){
        const filteredTasks = items.filter(task => task.priority == e.target.value);
        setTasks(filteredTasks);
    }

    function handleSorting(e){
        if(e.target.value == "status"){
            const statusOrder = ["Not started", "In progress", "On hold", "Cancelled", "Completed"];
            const sortedTasks = [...items].sort(
                (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
            );
            setTasks(sortedTasks);
        }
        if(e.target.value == "priority"){
            const priorityOrder = ["Low", "Medium", "Critical"];
            const sortedTasks = [...items].sort(
                (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
            );
            setTasks(sortedTasks);
        }
        if(e.target.value == "date"){
            const sortedTasks = [...items].sort(
                (a, b) => new Date(b.taskDate) - new Date(a.taskDate)
            )
            setTasks(sortedTasks);
        }
    }

    useEffect(() => {
        setTasks(items);
    }, [items])

    return (
        <div className={`taskList_component ${theme ? "light_back" : ""}`}>
          <div className={`taskList_filter_sorting_btns_box ${theme ? "light_back_color_select" : ""}`}>
            <input className={`taskList_search_title_input ${theme ? "light_back_color" : ""}`} type="text" placeholder="search task by title" onChange={handleSearchByTitle}/>
            <select className="taskList_status_filter" value="" onChange={handleStatusFilter}>
                 <option value="" disabled>Filter By Status</option>
                 <option value="Not started">Not Started</option>
                 <option value="In progress">In progress</option>
                 <option value="On hold">On hold</option>
                 <option value="Cancelled">Cancelled</option>
                 <option value="Completed">Completed</option>
            </select>
            <select className="taskList_priority_filter" value="" onChange={handlePriorityFilter}>
                 <option value="" disabled>Filter by priority</option>
                 <option value="Low">Low</option>
                 <option value="Medium">Medium</option>
                 <option value="Critical">Critical</option>
            </select>
            <select className="taskList_sorting_filter" value="" onChange={handleSorting}>
                 <option value="" disabled>Sort by:</option>
                 <option value="status">Status</option>
                 <option value="priority">Priority</option>
                 <option value="date">Date</option>
            </select>
             <button className="taskList_reset_filters_btn" onClick={() => setTasks(items)}>Reset Filters</button>
            </div>
            <div className="tasksList_tasks_container">
                {tasks?.map((task, index) => {
                    return <TaskItem task={task} key={task?.taskId || index}/>
                })}
           </div>
        </div>
    )
}

export default TaskList;