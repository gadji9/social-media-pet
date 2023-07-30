import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
    test('should return state', () => {
        const loginState = {
            password: '123',
            username: 'user',
            error: 'error',
            isLoading: true,
        };
        const state: DeepPartial<StateSchema> = {
            login: loginState,
        };
        expect(getLoginState(state as StateSchema)).toEqual(loginState);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toBe(undefined);
    });
});
