import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetailsPage/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        try {
            if (!articleId) {
                return thunkApi.rejectWithValue('articleid not porvided');
            }
            const response = await thunkApi.extra.api.get<Comment[]>(
                '/comments',
                {
                    params: {
                        articleId,
                        _expand: 'user',
                    },
                },
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue('server error');
        }
    },
);
