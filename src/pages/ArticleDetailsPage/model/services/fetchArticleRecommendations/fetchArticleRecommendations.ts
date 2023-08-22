import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Article, ArticleType } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (_, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Article[]>('/articles', {
            params: {
                _limit: 4,
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
