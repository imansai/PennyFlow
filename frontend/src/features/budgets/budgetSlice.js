import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import budgetService from './budgetService'

const initialState = {
    budgets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// create new budget
export const createBudget = createAsyncThunk(
    'budgets/create', 
    async (budgetData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await budgetService.createBudget(budgetData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)        
        }
    }
)


// Get user budgets
export const getBudgets = createAsyncThunk('budgets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await budgetService.getBudgets(token)        
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)          
    }
})

// Delete user budget
export const deleteBudget = createAsyncThunk(
    'budgets/delete', 
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await budgetService.deleteBudget(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)        
        }
    }
)

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBudget.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBudget.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.budgets.push(action.payload)
            })
            .addCase(createBudget.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBudgets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBudgets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.budgets = action.payload
            })
            .addCase(getBudgets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteBudget.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBudget.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.budgets = state.budgets.filter((budget) => budget._id !== action.payload.id)
            })
            .addCase(deleteBudget.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = budgetSlice.actions
export default budgetSlice.reducer