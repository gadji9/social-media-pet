import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Country } from 'entities/Country';

import { Select } from 'shared/ui/Select/Select';

interface ICountrySelectProps {
    value?: Country;
    readOnly?: boolean;
    onChange?: (value: Country) => void;
}

const options = [
    { value: Country.RUSSIA, content: Country.RUSSIA },
    { value: Country.BELARUS, content: Country.BELARUS },
    { value: Country.UKRAINE, content: Country.UKRAINE },
    { value: Country.KAZAKHSTAN, content: Country.KAZAKHSTAN },
    { value: Country.ARMENIA, content: Country.ARMENIA },
];

export const CountrySelect: FunctionComponent<ICountrySelectProps> = memo(
    ({ readOnly, value, onChange }) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback((value: string) => {
            onChange?.(value as Country);
        }, []);

        return (
            <Select
                label={t('Ваша страна')}
                options={options}
                value={value || t('Не указано')}
                readOnly={readOnly}
                onChange={onChangeHandler}
            />
        );
    },
);
