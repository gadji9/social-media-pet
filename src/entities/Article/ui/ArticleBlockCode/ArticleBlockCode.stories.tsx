import { Meta, StoryObj } from '@storybook/react';

import { ArticleBlockType } from 'entities/Article/model/types/article';

import { ArticleBlockCode } from './ArticleBlockCode';

const meta = {
    title: 'ArticleBlockCode',
    component: ArticleBlockCode,
} satisfies Meta<typeof ArticleBlockCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        block: {
            code: 'Hey',
            id: '1',
            type: ArticleBlockType.CODE,
        },
    },
};
