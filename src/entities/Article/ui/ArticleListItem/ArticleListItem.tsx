import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';

import {
    FunctionComponent,
    HTMLAttributeAnchorTarget,
    useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EyeIcon from 'shared/assets/icons/eye.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';

import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types/article';
import { ArticleBlockText } from '../ArticleBlockText/ArticleBlockText';
import cls from './ArticleListItem.module.scss';

interface IArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    linkTarget?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FunctionComponent<IArticleListItemProps> = ({
    className,
    article,
    view,
    linkTarget,
}) => {
    const { t } = useTranslation('articles');

    const navigate = useNavigate();

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <article
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            text={article.user.username}
                            className={cls.username}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    <Text
                        text={article.type.join(', ')}
                        className={cls.types}
                    />
                    <img
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleBlockText
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={linkTarget}
                            to={RoutePath.article_details + article.id}
                        >
                            <Button theme={ThemeButton.OUTLINE}>
                                {t('Читать далее...')}
                            </Button>
                        </AppLink>
                        <Text
                            text={article.views.toString()}
                            className={cls.views}
                        />
                        <Icon Svg={EyeIcon} />
                    </div>
                </Card>
            </article>
        );
    }

    return (
        <AppLink
            target={linkTarget}
            to={RoutePath.article_details + article.id}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img
                        src={article.img}
                        className={cls.img}
                        alt={t('Изображение статьи')}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text
                        text={article.type.join(', ')}
                        className={cls.types}
                    />
                    <Text
                        text={article.views.toString()}
                        className={cls.views}
                    />
                    <Icon Svg={EyeIcon} />
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
};
