import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageUrl: "",
    validateHelper: {
        isValid: true,
        message: "",
    },
    newSkU: "",
    imageFile: {},
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        changeImage(state, action) {
            state.imageUrl = action.payload.imageUrl;
        },
        changeInvalidate(state, action) {
            state.validateHelper = action.payload.validateHelper;
        },
        changeNewSku(state, action) {
            state.newSkU = action.payload;
        },
        changeImageFile(state, action) {
            state.imageFile = action.payload.imageFile;
        },
    },
});

export const { changeImage, changeInvalidate, changeNewSku, changeImageFile } =
    productSlice.actions;
export default productSlice.reducer;
