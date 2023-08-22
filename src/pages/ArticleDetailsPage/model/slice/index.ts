import { combineReducers } from '@reduxjs/toolkit';

import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationSlice';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsPageRecommendationsReducer,
        comments: articleDetailsCommentsReducer,
    });
