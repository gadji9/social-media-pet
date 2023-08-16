import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { User, userActions } from 'entities/User';

import { USER_LOCASTORAGE_KEY } from 'shared/consts/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.post<User>('/login', {
            username,
            password,
        });

        if (!response.data) {
            throw new Error('user not found');
        }
        localStorage.setItem(
            USER_LOCASTORAGE_KEY,
            JSON.stringify(response.data),
        );
        thunkApi.dispatch(userActions.setAuthData(response.data));

        thunkApi.extra?.navigate?.(`/profile/${response.data.id}`);
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('error');
    }
});
