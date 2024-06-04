import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {
    InitialStateProps, RateDataProps
} from "../../interface/redux/variable.interface";
import {toast} from "react-toastify";
import {http} from "../../config/api.ts";

export const createRate = createAsyncThunk('app/createRate', async (data: RateDataProps, {rejectWithValue}) => {
    try {
        const response = await http.post('/users/rate', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getUserById = createAsyncThunk('app/getUserById', async (userId: string, {rejectWithValue}) => {
    try {
        const response = await http.get(`/users/${userId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState: InitialStateProps = {
    loading: false,
    user: null
}

const reducers = {}

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state: InitialStateProps, action) => {
            state.user = action.payload.data
            state.loading = false
        })
        builder.addCase(getUserById.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(getUserById.rejected, (state: InitialStateProps) => {
            toast.error("Nimadir xato bo'ldi")
            state.loading = false
        })

        builder.addCase(createRate.fulfilled, (state: InitialStateProps) => {
            state.loading = false
        })
        builder.addCase(createRate.pending, (state: InitialStateProps) => {
            state.loading = true
        })
        builder.addCase(createRate.rejected, (state: InitialStateProps) => {
            toast.error("Nimadir xato bo'ldi")
            state.loading = false
        })
    }
})

// export const {
//
// } = variableSlice.actions;
export default variableSlice.reducer