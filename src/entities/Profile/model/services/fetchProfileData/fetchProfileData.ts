import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('login/fetchProfileData', async (authData, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Profile>('/profile');

        console.log(response);
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('error');
    }
});
