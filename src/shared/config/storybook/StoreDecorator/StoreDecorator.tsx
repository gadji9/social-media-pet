import { DeepPartial } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { StateSchema } from 'app/providers/StoreProvider';
import StoreProvider from 'app/providers/StoreProvider/ui/StoreProvider';

export const StoreDecorator =
    (state: DeepPartial<StateSchema>) => (Story: StoryFn) =>
        (
            <StoreProvider initialState={state}>
                <Story />
            </StoreProvider>
        );
