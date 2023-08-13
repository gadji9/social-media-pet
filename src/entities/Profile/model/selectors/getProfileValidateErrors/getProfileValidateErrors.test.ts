import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors', () => {
    test('should return profile form', () => {
        const validateErrors = [ValidateProfileError.INCORRECT_AGE];
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            validateErrors,
        );
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toBe(undefined);
    });
});
