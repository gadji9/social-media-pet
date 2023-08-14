import { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockText } from './ArticleBlockText';

const meta = {
    title: 'ArticleBlockText',
    component: ArticleBlockText,
} satisfies Meta<typeof ArticleBlockText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
