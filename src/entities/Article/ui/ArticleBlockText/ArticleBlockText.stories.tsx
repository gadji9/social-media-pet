import { Meta, StoryObj } from '@storybook/react';

import { ArticleBlockType } from 'entities/Article/model/types/article';

import { ArticleBlockText } from './ArticleBlockText';

const meta = {
    title: 'ArticleBlockText',
    component: ArticleBlockText,
} satisfies Meta<typeof ArticleBlockText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        block: {
            title: 'Hey',
            id: '1',
            type: ArticleBlockType.TEXT,
            paragraphs: ['heyho'],
        },
    },
};
