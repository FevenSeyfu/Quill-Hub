import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  comment: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getComments(postId, token,{ page: 1, pageSize: 1 });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getComment(commentId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, commentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.updateComment(commentId, commentData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(commentId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async (commentId, thunkAPI) => {
    try {
      return await commentService.likeComment(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments= action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = [action.payload];
      })
      .addCase(getComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedComment = action.payload;
        state.comments = state.comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        );
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedCommentId = action.payload;
        state.comments = state.comments.filter(
          (comment) => comment._id !== deletedCommentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
