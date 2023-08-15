import { FunctionComponent, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';

import { getArticleCommentsIsLoading } from '../model/selectors/comments';
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

    const { id } = useParams<{ id?: string }>();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    if (!id) {
        throw new Error(t('Статья с таким айди не найдена'));
    }

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetails id={id} />
                <Text title={t('Комментарии')} className={cls.commentTitle} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};
export default memo(ArticleDetailsPage);
