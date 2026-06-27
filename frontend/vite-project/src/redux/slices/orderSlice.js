import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BACKEND_URL;

// Async Thunk to fetch orders list

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Base_Url}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("Orders =>",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//Async Thunk to fetch specific order
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async ( orderId , { rejectWithValue }) => {
    console.log("Order Details Id =>",orderId);
    try {
      const response = await axios.get(`${Base_Url}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
       console.log("Order Details Response =>",response.data);
      return response.data;
    } catch (error) {
      console.log("Order Details Error =>",error);
      return rejectWithValue(error.response.data);
    }
  },
);

// Create Orders Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //Fetch Orders List
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //Fetch Single Order
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
