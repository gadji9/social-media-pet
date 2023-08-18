import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Article } from 'entities/Article';

import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps | void,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (options, thunkApi) => {
    const { page } = options || { page: 1 };
    const limit = getArticlesPageLimit(thunkApi.getState());
    try {
        const response = await thunkApi.extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('server error');
    }
});
