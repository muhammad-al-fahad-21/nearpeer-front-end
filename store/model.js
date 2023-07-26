import { createSlice } from "@reduxjs/toolkit"

const model = createSlice({
    name: "model",
    initialState: {
        success: '',
        error: '',
        delete: []
    },
    reducers: {
        onSuccess: (model, action) => {
            model.success = action.payload.success,
            model.error = action.payload.error
        },

        onError: (model, action) => {
            model.error = action.payload.error,
            model.success = action.payload.success
        },

        isVerify: (model, action) => {
            model.delete = action.payload.delete
        } 
    }
})

export const Error = (error) => (dispatch) => {
    return dispatch(onError({ error, success: '' }))
}

export const Success = (success) => (dispatch) => {
    return dispatch(onSuccess({ success, error: '' }))
}

export const Delete = (model) => (dispatch) => {
    return dispatch(isVerify({ delete: model }))
}

export const { onSuccess, onError, isVerify } = model.actions;
export default model.reducer;