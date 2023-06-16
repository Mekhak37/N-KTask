import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks = createAsyncThunk(
  "getTasks/forTasksPage",
  async (selectedPage, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://rocky-temple-83495.herokuapp.com/tasks?_page=${selectedPage}&_limit=5`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addTask = createAsyncThunk(
  "addTask/forTasksPage",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://rocky-temple-83495.herokuapp.com/tasks",
        data
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTask = createAsyncThunk(
  "updateTask/forTasksPage",
  async (newData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `https://rocky-temple-83495.herokuapp.com/tasks/${newData.id}`,
        newData.data
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "deleteTask/forTasksPage",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://rocky-temple-83495.herokuapp.com/tasks/${id}`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const taskSlice = createSlice({
  name: "task",
  initialState: {
    fileredData: [],
    task: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.loading = true;
    },
    [getTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.task = action.payload;
      state.error = "";
    },
    [getTasks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addTask.pending]: (state) => {
      state.loading = true;
    },
    [addTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [addTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateTask.pending]: (state) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [updateTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteTask.pending]: (state) => {
      state.loading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [deleteTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default taskSlice.reducer;
