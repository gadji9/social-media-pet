import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

import { Article } from 'entities/Article';

import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsPageRecommendationsSchema } from '../types/articleDetailsPageRecommendationSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (recommendation) => recommendation.id,
});

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    );

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
            {
                isLoading: false,
                ids: [],
                error: undefined,
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchArticleRecommendations.pending,
            (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            },
        );
        builder.addCase(
            fetchArticleRecommendations.fulfilled,
            (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            },
        );
        builder.addCase(
            fetchArticleRecommendations.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },
        );
    },
});

export const { reducer: articleDetailsPageRecommendationsReducer } =
    articleDetailsPageRecommendationsSlice;
export const { actions: articleDetailsPageRecommendationsActions } =
    articleDetailsPageRecommendationsSlice;
