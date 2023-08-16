import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, ThunkConfig } from 'app/providers/StoreProvider';

import { getArticleData } from 'entities/Article';
import { Comment } from 'entities/Comment';
import { getUserAuthState } from 'entities/User';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('articleDetailsPage/addCommentForArticle', async (text, thunkApi) => {
    try {
        const userData = getUserAuthState(thunkApi.getState());
        const article = getArticleData(thunkApi.getState());
        if (!userData || !text || !article?.id) {
            return thunkApi.rejectWithValue('not enought data');
        }

        const response = await thunkApi.extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        });
        if (!response.data) {
            throw new Error();
        }

        thunkApi.dispatch(fetchCommentsByArticleId('1'));

        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('server error');
    }
});
