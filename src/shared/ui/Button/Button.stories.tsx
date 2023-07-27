import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, SizeButton, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundM = Template.bind({});
BackgroundM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.M,
};
BackgroundM.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedM = Template.bind({});
BackgroundInvertedM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.M,
};
BackgroundInvertedM.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareM = Template.bind({});
SquareM.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.M,
};

export const BackgroundL = Template.bind({});
BackgroundL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.L,
};
BackgroundL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedL = Template.bind({});
BackgroundInvertedL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.L,
};
BackgroundInvertedL.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareL = Template.bind({});
SquareL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.L,
};
SquareL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundXL = Template.bind({});
BackgroundXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
    size: SizeButton.XL,
};
BackgroundXL.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedXL = Template.bind({});
BackgroundInvertedXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    size: SizeButton.XL,
};
BackgroundInvertedXL.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: SizeButton.XL,
};
SquareXL.decorators = [ThemeDecorator(Theme.DARK)];
