import { FunctionComponent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockCode.module.scss';

interface IArticleBlockCodeProps {
    className?: string;
}

export const ArticleBlockCode: FunctionComponent<IArticleBlockCodeProps> = ({
    className,
}) => {
    return (
        <div className={classNames(cls.ArticleBlockCode, {}, [className])}>
            ArticleBlockCode
        </div>
    );
};
