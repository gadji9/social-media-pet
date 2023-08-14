import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSchema } from '../types/articleSchema';
import { Article } from '../types/article';
import { fetchArticleById } from '../services/fetchArticleById';

const initialState: ArticleSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleById.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchArticleById.fulfilled,
            (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
            },
        );
        builder.addCase(fetchArticleById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: articleActions } = profileSlice;

export const { reducer: articleReducer } = profileSlice;
