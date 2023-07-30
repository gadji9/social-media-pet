import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            login: { isLoading: true },
        };
        expect(getLoginIsLoading(state as StateSchema)).toBe(true);
    });

    test('should return false with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginIsLoading(state as StateSchema)).toBe(false);
    });
});
