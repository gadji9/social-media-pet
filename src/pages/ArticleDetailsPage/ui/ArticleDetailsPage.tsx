import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';

import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Page } from 'widgets/Page';

import { AddCommentForm } from 'features/addCommentForm';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../model/selectors/recommendations';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../model/slice';
import { getArticleComments } from '../model/slice/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../model/slice/articleDetailsPageRecommendationSlice';
import cls from './ArticleDetailsPage.module.scss';

interface IArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FunctionComponent<IArticleDetailsPageProps> = ({
    className,
}) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articleDetails');
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading,
    );

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    }, [dispatch]);

    if (!id) {
        throw new Error(t('Статья с таким айди не найдена'));
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    title={t('Рекомендуем')}
                    className={cls.commentTitle}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    linkTarget="_blank"
                />

                <Text
                    size={TextSize.L}
                    title={t('Комментарии')}
                    className={cls.commentTitle}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);
