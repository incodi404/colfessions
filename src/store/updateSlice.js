import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    updateData: null
}

const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.updateData = action.payload.updateData
        },
        deleteData: (state) => {
            state.updateData = null
        }
    }
})

export const {setData, deleteData} = updateSlice.actions

export default updateSlice.reducer