import { FunctionComponent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockImage.module.scss';

interface IArticleBlockImageProps {
    className?: string;
}

export const ArticleBlockImage: FunctionComponent<IArticleBlockImageProps> = ({
    className,
}) => {
    return (
        <div className={classNames(cls.ArticleBlockImage, {}, [className])}>
            ArticleBlockImage
        </div>
    );
};
