import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    ArticleList,
    ArticleView,
    ArticleViewSelector,
} from 'entities/Article';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Page } from 'shared/ui/Page/Page';

import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import {
    articlesPageActions,
    articlesPageReducer,
    gerArticles,
} from '../model/slice/articlesPageSlice';

interface IArticlesPageProps {
    className?: string;
}
const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
const ArticlesPage: FunctionComponent<IArticlesPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(gerArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    const onLoadMore = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, []);

    useEffect(() => {
        dispatch(initArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadMore}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
