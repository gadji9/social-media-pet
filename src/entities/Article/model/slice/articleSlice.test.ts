import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { fetchArticleById } from '../services/fetchArticleById';
import { Article, ArticleBlockType, ArticleType } from '../types/article';
import { ArticleSchema } from '../types/articleSchema';
import { articleReducer } from './articleSlice';

const data = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [
        {
            id: '5',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста.',
            ],
        },
    ],
};

describe('articleSlice', () => {
    test('test fetchArticleById service fullfiled', () => {
        const state: DeepPartial<ArticleSchema> = {
            isLoading: true,
        };
        expect(
            articleReducer(
                state as ArticleSchema,
                fetchArticleById.fulfilled(data as Article, '', ''),
            ),
        ).toEqual({
            isLoading: false,
            data,
        });
    });
});
