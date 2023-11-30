import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import expenseReducer from '../features/expenses/expenseSlice'
import incomeReducer from '../features/incomes/incomeSlice'
import budgetReducer from '../features/budgets/budgetSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    incomes: incomeReducer,
    budgets: budgetReducer,
  },
});
