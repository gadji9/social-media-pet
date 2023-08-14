import { FunctionComponent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockText.module.scss';

interface IArticleBlockTextProps {
    className?: string;
}

export const ArticleBlockText: FunctionComponent<IArticleBlockTextProps> = ({
    className,
}) => {
    return (
        <div className={classNames(cls.ArticleBlockText, {}, [className])}>
            ArticleBlockText
        </div>
    );
};
