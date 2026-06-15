import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const Base_Url = import.meta.env.VITE_BACKEND_URL;

//Async Thunk to create Checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async ({ checkoutData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/checkout`,
        checkoutData,
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

// Create Checkout Slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to create checkout";
      });
  },
});

export default checkoutSlice.reducer;
