import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
    test('should return profile error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'Hey',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('Hey');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toBe(undefined);
    });
});
