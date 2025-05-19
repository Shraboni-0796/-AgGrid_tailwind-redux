import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dummydata } from '../data';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
//   const response = await axios.get(''); // Replace with your API
//   return response.data;
await new Promise((resolve) => setTimeout(resolve, 500));
  return dummydata;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;