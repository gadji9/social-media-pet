import { Country } from 'shared/consts/country';
import { Currency } from 'shared/consts/currency';

export interface Profile {
    first: string;
    lastname: string;
    age: number;
    currency: Currency;
    country: Country;
    city: string;
    username: string;
    avatar: string;
}

export interface ProfileSchema {
    data: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
}
