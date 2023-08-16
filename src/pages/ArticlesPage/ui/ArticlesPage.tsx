import { FunctionComponent, memo } from 'react';

import { Article, ArticleList } from 'entities/Article';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticlesPage.module.scss';

interface IArticlesPageProps {
    className?: string;
}
const ArticlesPage: FunctionComponent<IArticlesPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.index, {}, [className])}>
            <ArticleList articles={[]} />
        </div>
    );
};

export default memo(ArticlesPage);
