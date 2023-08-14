import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (authData, thunkApi) => {
    try {
        const formData = getProfileForm(thunkApi.getState());
        const errors = validateProfileData(formData);

        if (errors.length) {
            console.log(errors);
            return thunkApi.rejectWithValue(errors);
        }

        const response = await thunkApi.extra.api.put<Profile>(
            '/profile',
            formData,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
