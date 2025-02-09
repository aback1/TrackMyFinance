import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  month: '',
  income: 0,
  rentcosts: 0,
  sidecosts: 0,
  foodanddrinkscosts: 0,
  hobbycosts: 0,
  savingscosts: 0,
  mobilitycosts: 0,
  insurance: 0,
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addComparison: (state, action) => {
      //we can here also simply return the action.payload.
      //but this approach is better when some costs are not defined
      //since we don't want to assign undefined values.
      return { ...state, ...action.payload };
    },
  },
});

export const { addComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;
