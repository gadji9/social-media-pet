import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { NavigateOptions, To } from 'react-router-dom';

import {
    ArticleDetailsCommentsSchema,
    ArticleDetailsPageRecommendationsSchema,
    ArticleDetailsPageSchema,
} from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

import type { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ScrollSaverSchema } from 'features/scrollSaver';

import { ArticleSchema } from 'entities/Article';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';

import { AppDispatch } from './store';

export interface StateSchema {
    user: UserSchema;
    scrollSaver: ScrollSaverSchema;
    login?: LoginSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
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
}

export interface ThunkConfig<rejectType> {
    rejectValue: rejectType;
    extra: ThunkExtraArg;
    dispatch: AppDispatch;
    state: StateSchema;
}
