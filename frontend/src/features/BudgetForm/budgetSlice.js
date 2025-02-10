import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  month: '02-2025',
  income: 0,
  rentcosts: 0,
  sidecosts: 0,
  foodanddrinkscosts: 0,
  hobbycosts: 0,
  savingscosts: 0,
  mobilitycosts: 0,
  insurancecosts: 0,
};

export const budGetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addSpendings: (state, action) => {
      return { ...state, ...action.payload };
    },
    addMonth: (state, action) => {
      state.month = action.payload;
    },
    addIncome: (state, action) => {
      state.income = action.payload;
    },
    addRentCosts: (state, action) => {
      state.rentcosts = action.payload;
    },
    addSideCosts: (state, action) => {
      state.sidecosts = action.payload;
    },
    addFoodAndDrinksCosts: (state, action) => {
      state.foodanddrinkscosts = action.payload;
    },
    addHobbyCosts: (state, action) => {
      state.hobbycosts = action.payload;
    },
    addSavingsCosts: (state, action) => {
      state.savingscosts = action.payload;
    },
    addMobilityCosts: (state, action) => {
      state.mobilitycosts = action.payload;
    },
    addInsuranceCosts: (state, action) => {
      state.insurancecosts = action.payload;
    },
  },
});

export const {
  addSpendings,
  addMonth,
  addIncome,
  addFoodAndDrinksCosts,
  addRentCosts,
  addHobbyCosts,
  addMobilityCosts,
  addSideCosts,
  addSavingsCosts,
  addInsuranceCosts,
} = budGetSlice.actions;

export default budGetSlice.reducer;
