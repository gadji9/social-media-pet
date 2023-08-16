import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';

import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { AddCommentForm } from 'features/addCommentForm';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';

import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface IArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleComments: articleDetailsCommentsReducer,
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
    }, [dispatch]);

    if (!id) {
        throw new Error(t('Статья с таким айди не найдена'));
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id} />
                <Text title={t('Комментарии')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);
