import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
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

describe('validateProfileData', () => {
    test('success', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({
            ...data,
            first: '',
            lastname: '',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const result = validateProfileData({
            ...data,
            age: undefined,
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect country', async () => {
        const result = validateProfileData({
            ...data,
            country: undefined,
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });
    test('incorrect all', async () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
