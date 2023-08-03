import { ReducersMapObject } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername';
import { ReactNode } from 'react';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    login: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator: (state: DeepPartial<StateSchema>) => any =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    ) =>
        (Story: StoryFn) =>
            (
                <StoreProvider
                    initialState={state}
                    asyncReducers={defaultAsyncReducers}
                >
                    <Story />
                </StoreProvider>
            );
