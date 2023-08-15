import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

import React from 'react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextSize, TextTheme } from './Text';

const meta = {
    title: 'widgets/ErrorPage',
    component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: () => <Text />,
    args: {
        title: 'Title',
        text: 'Text',
    },
    decorators: [],
};

export const Error: Story = {
    render: () => <Text />,
    args: {
        title: 'Title',
        text: 'Text',
        theme: TextTheme.ERROR,
    },
};
export const OnlyTitle: Story = {
    render: () => <Text />,
};

OnlyTitle.args = {
    title: 'Title',
};

export const OnlyText: Story = {
    render: () => <Text />,
};
OnlyText.args = {
    text: 'Text',
};

export const PrimaryDark: Story = {
    render: () => <Text />,
};
PrimaryDark.args = {
    title: 'Title',
    text: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark: Story = {
    render: () => <Text />,
};
Primary.args = {
    title: 'Title',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark: Story = {
    render: () => <Text />,
};
Primary.args = {
    text: 'Text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeM: Story = {
    render: () => <Text />,
};
Primary.args = {
    text: 'Text',
    size: TextSize.M,
};
export const SizeL: Story = {
    render: () => <Text />,
};
Primary.args = {
    text: 'Text',
    size: TextSize.L,
};
