import { FunctionComponent, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getArticleData,
    getArticleError,
    getArticleIsLoading,
} from 'entities/Article/model/selectors/article';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { articleReducer } from 'entities/Article/model/slice/articleSlice';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';

import CalendarIcon from 'shared/assets/icons/calendar.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';

import { ArticleBlockCode } from '../ArticleBlockCode/ArticleBlockCode';
import { ArticleBlockImage } from '../ArticleBlockImage/ArticleBlockImage';
import { ArticleBlockText } from '../ArticleBlockText/ArticleBlockText';
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
        const isLoading = useSelector(getArticleIsLoading);

        const error = useSelector(getArticleError);

        const renderBlock = useCallback((block: ArticleBlock) => {
            switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleBlockCode
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleBlockImage
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleBlockText
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            default:
                return null;
            }
        }, []);

        const { t } = useTranslation('articleDetails');

        useEffect(() => {
            dispatch(fetchArticleById(id));
        }, [dispatch]);

        let content;

        if (isLoading) {
            content = (
                <>
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
                </>
            );
        } else if (error) {
            content = <Text align={TextAlign.CENTER} text={t('Ошибка')} />;
        } else {
            content = (
                <>
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            size={200}
                            src={article?.img}
                            className={cls.avatar}
                        />
                    </div>

                    <Text
                        className={cls.title}
                        title={article?.title}
                        text={article?.subtitle}
                        size={TextSize.L}
                    />
                    <div className={cls.articleInfo}>
                        <Icon Svg={EyeIcon} className={cls.icon} />
                        <Text text={article?.views?.toString()} />
                    </div>
                    <div className={cls.articleInfo}>
                        <Icon Svg={CalendarIcon} className={cls.icon} />

                        <Text text={article?.createdAt} />
                    </div>
                    {article?.blocks.map(renderBlock)}
                </>
            );
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
