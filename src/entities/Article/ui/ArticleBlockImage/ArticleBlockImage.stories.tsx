import { Meta, StoryObj } from '@storybook/react';

import { ArticleBlockType } from 'entities/Article/model/types/article';

import { ArticleBlockImage } from './ArticleBlockImage';

const meta = {
    title: 'ArticleBlockImage',
    component: ArticleBlockImage,
} satisfies Meta<typeof ArticleBlockImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        block: {
            title: 'Hey',
            id: '1',
            type: ArticleBlockType.IMAGE,
            src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
        },
    },
};
