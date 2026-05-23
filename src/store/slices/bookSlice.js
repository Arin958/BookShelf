import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
});