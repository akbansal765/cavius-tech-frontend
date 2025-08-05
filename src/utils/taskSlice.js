import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const createTaskDB = createAsyncThunk("createTaskDB", async (task, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("caviusTechUser"))?.email || "";
        const response = await fetch(`https://cavius-tech-backend.onrender.com/task?email=${userEmail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to create the Task");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const deleteTaskDB = createAsyncThunk("deleteTaskDB", async (taskId, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("caviusTechUser"))?.email || "";
        const response = await fetch(`https://cavius-tech-backend.onrender.com/task/${taskId}?email=${userEmail}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to delete the task");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const updateTaskDB = createAsyncThunk("updateTaskDB", async (task, thunkAPI) => {
    console.log(task);
    try{
        const userEmail = JSON.parse(localStorage.getItem("caviusTechUser"))?.email || "";
        const response = await fetch(`https://cavius-tech-backend.onrender.com/task/${task.taskId}?email=${userEmail}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to update the task!");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const getTasksDB = createAsyncThunk("getTasksDB", async (_, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("caviusTechUser"))?.email || "";
        const response = await fetch(`https://cavius-tech-backend.onrender.com/tasks?email=${userEmail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${JSON.parse(localStorage.getItem("caviusTechUser")).accessToken}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "Failed to get tasks!");
        }
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        items: [],
        error: "",
        isLightThemeOn: false
    },
    reducers: {
        addTask : (state, action) => {
           state.items.push(action.payload);
        },
        deleteTask: (state, action) => {
           const index = state.items.findIndex(task => task.taskId == action.payload);
           if(index == -1){
             return console.log('Task not found')
           }
           state.items.splice(index, 1);
        },
        updateTask: (state, action) => {
           const index = state.items.findIndex(task => task.taskId == action.payload.taskId);
           if(index == -1){
             return console.log('Task not found')
           }
           state.items[index] = action.payload;
        //    console.log(JSON.parse(JSON.stringify(task)));
        },
        changeTheme: (state, action) => {
           state.isLightThemeOn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTaskDB.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        .addCase(createTaskDB.rejected, (state) => {
            console.log(action.payload)
        });

        builder
        .addCase(deleteTaskDB.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        .addCase(deleteTaskDB.rejected, (state) => {
            console.log(action.payload)
        });

        builder
        .addCase(updateTaskDB.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        .addCase(updateTaskDB.rejected, (state) => {
            console.log(action.payload)
        });

        builder
        .addCase(getTasksDB.pending, (state) => {
        })
        .addCase(getTasksDB.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = "";

            console.log(action.payload)
        })
        .addCase(getTasksDB.rejected, (state, action) => {
            state.error = action.payload;
            //when user logout or unable to fetch tasks make the state zero
            state.items = [];

            console.log(action.payload)
        });
    }
});

export const {addTask, deleteTask, updateTask, changeTheme} = taskSlice.actions;
export default taskSlice.reducer;