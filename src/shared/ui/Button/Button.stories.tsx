import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, SizeButton, ThemeButton } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
Primary.args = {
    children: 'Text',
};

export const Clear: Story = {};
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

export const ClearInverted: Story = {};
ClearInverted.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR_INVERTED,
};

export const Outline: Story = {};
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark: Story = {};
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundM: Story = {};
BackgroundM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.M,
};
BackgroundM.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedM: Story = {};
BackgroundInvertedM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.M,
};
BackgroundInvertedM.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareM: Story = {};
SquareM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.M,
};

export const BackgroundL: Story = {};
BackgroundL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.L,
};
BackgroundL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedL: Story = {};
BackgroundInvertedL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.L,
};
BackgroundInvertedL.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareL: Story = {};
SquareL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.L,
};
SquareL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundXL: Story = {};
BackgroundXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.XL,
};
BackgroundXL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedXL: Story = {};
BackgroundInvertedXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.XL,
};
BackgroundInvertedXL.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareXL: Story = {};
SquareXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.XL,
};
SquareXL.decorators = [ThemeDecorator(Theme.DARK)];

export const Disabled: Story = {};
Disabled.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    disabled: true,
};
Disabled.decorators = [ThemeDecorator(Theme.DARK)];
