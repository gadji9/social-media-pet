import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from 'entities/Article';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import {
    articlesPageActions,
    getInitialArticlesPageState,
} from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());
    if (!inited) {
        const order = searchParams.get('order') as SortOrder;
        const sort = searchParams.get('sort') as ArticleSortField;
        const search = searchParams.get('search');
        const type = searchParams.get('type') as ArticleType;
        const inititalState = getInitialArticlesPageState();

        dispatch(articlesPageActions.setOrder(order || inititalState.order));
        dispatch(articlesPageActions.setSort(sort || inititalState.sort));
        dispatch(articlesPageActions.setSearch(search || inititalState.search));
        dispatch(
            articlesPageActions.setOrder(
                (order as SortOrder) || inititalState.order,
            ),
        );
        dispatch(articlesPageActions.setType(type || inititalState.type));

        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
