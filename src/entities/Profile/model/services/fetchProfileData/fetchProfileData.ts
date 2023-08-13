import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import type { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('login/fetchProfileData', async (authData, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Profile>('/profile');

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('error');
    }
});
