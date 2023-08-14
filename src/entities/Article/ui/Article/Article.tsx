import { FunctionComponent, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { articleReducer } from 'entities/Article/model/slice/articleSlice';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';

import { useSelector } from 'react-redux';
import {
    getArticleData,
    getArticleError,
} from 'entities/Article/model/selectors/article';
import cls from './Article.module.scss';

interface IArticleProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    article: articleReducer,
};

export const Article: FunctionComponent<IArticleProps> = memo(
    ({ className, id }) => {
        const dispatch = useAppDispatch();

        const article = useSelector(getArticleData);
        // const isLoading = useSelector(getArticleIsLoading);
        const isLoading = true;

        const error = useSelector(getArticleError);

        const { t } = useTranslation('articleDetails');

        useEffect(() => {
            dispatch(fetchArticleById(id));
        }, [dispatch]);

        let content;

        if (isLoading) {
            content = (
                <div>
                    <Skeleton
                        className={cls.avatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                    <Skeleton className={cls.title} width={300} height={24} />
                    <Skeleton
                        className={cls.skeleton}
                        width={600}
                        height={24}
                    />
                    <Skeleton
                        className={cls.skeleton}
                        width="100%"
                        height={200}
                    />
                    <Skeleton
                        className={cls.skeleton}
                        width="100%"
                        height={200}
                    />
                </div>
            );
        }

        if (error) {
            content = <Text align={TextAlign.CENTER} text={t('Ошибка')} />;
        }

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <div className={classNames(cls.index, {}, [className])}>
                    {content}
                </div>
            </DynamicModuleLoader>
        );
    },
);
