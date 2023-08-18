import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from './fetchArticlesList';

const data = [
    {
        id: '3',
        title: 'Kotlin news',
        subtitle: 'Что нового в JS за 2022 год?',
        // eslint-disable-next-line max-len
        img: 'https://cdn.vectorstock.com/i/1000x1000/72/15/kotlin-mobile-application-programming-language-vector-21947215.webp',
        views: 1022,
        createdAt: '26.02.2022',
        userId: '1',
        type: ['IT'],
        blocks: [
            {
                id: '1',
                type: 'TEXT',
                title: 'Заголовок этого блока',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста.',
                ],
            },
        ],
    },
    {
        id: '4',
        title: 'Kotlin news',
        subtitle: 'Что нового в JS за 2022 год?',
        // eslint-disable-next-line max-len
        img: 'https://cdn.vectorstock.com/i/1000x1000/72/15/kotlin-mobile-application-programming-language-vector-21947215.webp',
        views: 1022,
        createdAt: '26.02.2022',
        userId: '1',
        type: ['IT'],
        blocks: [
            {
                id: '1',
                type: 'TEXT',
                title: 'Заголовок этого блока',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста.',
                ],
            },
        ],
    },
];

describe('fetchArticlesList.test', () => {
    test('success, no params', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {},
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.payload).toEqual(data);
    });
    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {},
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('server error');
    });

    test('success with page (limit 1)', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                limit: 1,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: [data[1]] }));

        const result = await thunk.callThunk({
            page: 2,
        });

        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 1,
                _page: 2,
            },
        });
        expect(result.payload).toEqual([data[1]]);
    });
});
