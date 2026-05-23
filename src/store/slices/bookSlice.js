import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filter: "all",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.items.push({
        id: Crypto.randomUUID(),
        ...action.payload,
        addedAt: new Date().toISOString(),
        status: "want",
      });
    },
    deleteBook: (state, action) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
    },
    toggleBookStatus: (state, action) => {
      const book = state.items.find((book) => book.id === action.payload);
      if (book) {
        book.status = book.status === "want" ? "read" : "want";
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateBookStatus: (state, action) => {
      const book = state.items.find((book) => book.id === action.payload.id);
      if (book) {
        book.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    })
    .addCase(fetchBooks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});


export const {addBook, deleteBook, toggleBookStatus, setFilter, updateBookStatus} = bookSlice.actions;
export default bookSlice.reducer;
