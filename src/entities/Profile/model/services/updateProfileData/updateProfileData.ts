import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('login/updateProfileData', async (authData, thunkApi) => {
    try {
        const formData = getProfileForm(thunkApi.getState());

        const response = await thunkApi.extra.api.put<Profile>(
            '/profile',
            formData,
        );

        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue('error');
    }
});
