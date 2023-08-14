import { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockCode } from './ArticleBlockCode';

const meta = {
    title: 'ArticleBlockCode',
    component: ArticleBlockCode,
} satisfies Meta<typeof ArticleBlockCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
