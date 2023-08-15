import { Currency } from 'entities/Currency';
import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';

interface ICurrencySelectProps {
    className?: string;
    value?: Currency;
    readOnly?: boolean;
    onChange?: (value: Currency) => void;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect: FunctionComponent<ICurrencySelectProps> = memo(
    ({ className, readOnly, value, onChange }) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback((value: string) => {
            onChange?.(value as Currency);
        }, []);

        return (
            <Select
                className={className}
                label={t('Ваша валюта')}
                options={options}
                value={value || t('Не указано')}
                readOnly={readOnly}
                onChange={onChangeHandler}
            />
        );
    },
);
