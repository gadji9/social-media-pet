import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

import { Article, ArticleView } from 'entities/Article';

import { ARTICLE_VIEW_LOCASTORAGE_KEY } from 'shared/consts/localStorage';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlePageSchema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const gerArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        ids: [],
        error: undefined,
        entities: {},
        page: 1,
        view: ArticleView.SMALL,
        hasMore: false,
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCASTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLE_VIEW_LOCASTORAGE_KEY,
            ) as ArticleView;

            state.view = view;
            state.limit = view === ArticleView.BIG ? 3 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesList.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchArticlesList.fulfilled,
            (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            },
        );
        builder.addCase(fetchArticlesList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { reducer: articlesPageReducer } = articlePageSlice;
export const { actions: articlesPageActions } = articlePageSlice;
