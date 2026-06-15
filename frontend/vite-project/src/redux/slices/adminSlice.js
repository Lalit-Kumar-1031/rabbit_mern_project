import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BACKEND_URL;

// Fetch all admin Users

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(`${Base_Url}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data;
});

//Async Thunk to add new user
export const addUser = createAsyncThunk(
  "admin/addUser",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
