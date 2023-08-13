import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncFunc } from 'shared/lib/tests/testAyncFunt/testAsyncFunc';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'gadj',
    first: 'me',
    lastname: 'him',
    age: 25,
    city: 'Moscow',
    country: Country.ARMENIA,
    currency: Currency.EUR,
};

describe('fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncFunc(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callTunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncFunc(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callTunk();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});