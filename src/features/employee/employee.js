import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";


export const getEmployees = createAsyncThunk(
  "get",
  async (selectedPage, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://rocky-temple-83495.herokuapp.com/employees?_page=${selectedPage}&_limit=10`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addEmployee = createAsyncThunk("post", async (data, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://rocky-temple-83495.herokuapp.com/employees",
      data
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateEmployee = createAsyncThunk(
  "patch",
  async (newData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `https://rocky-temple-83495.herokuapp.com/employees/${newData.id}`,
        newData.data
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://rocky-temple-83495.herokuapp.com/employees/${id}`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
      state.error = "";
    },
    [getEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addEmployee.pending]: (state) => {
      state.loading = true;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [addEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default employeeSlice.reducer;
