import { FunctionComponent, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface IArticlesPageProps {
    className?: string;
}
const ArticlesPage: FunctionComponent<IArticlesPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.index, {}, [className])}>
            ArticlesPage
        </div>
    );
};

export default memo(ArticlesPage);
