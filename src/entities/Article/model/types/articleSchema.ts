import { Article } from './article';

export interface ArticleSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
