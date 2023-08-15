import {
    AnyAction,
    CombinedState,
    Dispatch,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { NavigateOptions, To } from 'react-router-dom';

import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';

import type { LoginSchema } from 'features/AuthByUsername';

import { ArticleSchema } from 'entities/Article';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';

export interface StateSchema {
    user: UserSchema;
    login?: LoginSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    articleComments?: ArticleDetailsCommentsSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<rejectType> {
    rejectValue: rejectType;
    extra: ThunkExtraArg;
    dispatch: Dispatch;
    state: StateSchema;
}
