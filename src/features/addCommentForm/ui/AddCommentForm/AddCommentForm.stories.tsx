import { Meta, StoryObj } from '@storybook/react';

import AddCommentForm from './AddCommentForm';

const meta = {
    title: 'AddCommentForm',
    component: AddCommentForm,
} satisfies Meta<typeof AddCommentForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
Normal.args = {};
