import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter_slice',
  initialState,
  reducers: {
    setCounter(state, action) {
        state.value = action.payload.value
    },
    resetCounter(state) {
        state.value = 0
    }
  },
});

export const { setCounter, resetCounter} = counterSlice.actions;
export default counterSlice.reducer;