import { Meta, StoryObj } from '@storybook/react';
import { Article } from './Article';

const meta = {
    title: 'Article',
    component: Article,
    args: {
        id: '1',
    },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
