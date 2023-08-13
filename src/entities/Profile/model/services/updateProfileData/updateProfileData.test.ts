import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncFunc } from 'shared/lib/tests/testAyncFunt/testAsyncFunc';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/profile';

const data = {
    username: 'gadj',
    first: 'me',
    lastname: 'him',
    age: 25,
    city: 'Moscow',
    country: Country.ARMENIA,
    currency: Currency.EUR,
};

describe('updateProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncFunc(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callTunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncFunc(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callTunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncFunc(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callTunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
