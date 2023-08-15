import { FunctionComponent, memo } from 'react';

import { ArticleImageBlock } from 'entities/Article/model/types/article';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';

import cls from './ArticleBlockImage.module.scss';

interface IArticleBlockImageProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleBlockImage: FunctionComponent<IArticleBlockImageProps> =
    memo(({ className, block }) => {
        return (
            <div className={classNames(cls.ArticleBlockImage, {}, [className])}>
                <img className={cls.img} src={block.src} alt="as" />
                {block.title && (
                    <Text text={block.title} align={TextAlign.CENTER} />
                )}
            </div>
        );
    });
