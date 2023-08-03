import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_THEME_KEY } from 'app/providers/ThemeProvider/lib/ThemeContext';
import axios from 'axios';
import { User, userActions } from 'entities/User';

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
            LOCAL_STORAGE_THEME_KEY,
            JSON.stringify(response.data),
        );
        thunkApi.dispatch(userActions.setAuthData(response.data));

        thunkApi.extra?.navigate?.('/profile');
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('error');
    }
});
