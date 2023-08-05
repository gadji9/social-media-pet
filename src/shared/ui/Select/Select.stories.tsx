import { Meta, StoryObj } from '@storybook/react';
import { Currency } from 'entities/Currency';
import { Select } from './Select';

const meta = {
    title: 'shared/Select',
    component: Select,
    args: {
        label: 'Валюта',
        options: [
            { value: Currency.RUB, content: Currency.RUB },
            { value: Currency.EUR, content: Currency.EUR },
            { value: Currency.USD, content: Currency.USD },
        ],
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: Currency.RUB,
    },
};
