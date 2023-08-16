import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';

const data = {
    id: '1',
    username: 'gadj',
    first: 'me',
    lastname: 'him',
    age: 25,
    city: 'Moscow',
    country: Country.ARMENIA,
    currency: Currency.EUR,
};

describe('profileSlice', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            validateError: [],
            form: {
                ...data,
                username: 'heyho',
            },
            data,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateError: undefined,
            form: data,
            data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            validateError: [],
            form: data,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({ username: 'new username' }),
            ),
        ).toEqual({
            readonly: false,
            validateError: [],
            form: { ...data, username: 'new username' },
        });
    });

    test('test updateProfile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            error: 'asd',
            isLoading: false,
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending),
        ).toEqual({
            error: undefined,
            isLoading: true,
        });
    });

    test('test updateProfile service fullfiled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(data, ''),
            ),
        ).toEqual({
            isLoading: false,
            validateError: undefined,
            readonly: true,
            form: data,
            data,
        });
    });
});
