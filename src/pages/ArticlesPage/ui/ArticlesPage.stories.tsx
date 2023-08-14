import { Meta, StoryObj } from '@storybook/react';
import { ArticlesPageAsync } from './ArticlesPage.async';

const meta = {
    title: 'ArticlesPage',
    component: ArticlesPageAsync,
} satisfies Meta<typeof ArticlesPageAsync>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
