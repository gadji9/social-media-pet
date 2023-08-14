import { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockImage } from './ArticleBlockImage';

const meta = {
    title: 'ArticleBlockImage',
    component: ArticleBlockImage,
} satisfies Meta<typeof ArticleBlockImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
