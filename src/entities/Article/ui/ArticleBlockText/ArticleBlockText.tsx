import { BlockList } from 'net';

import { FunctionComponent, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleBlockText.module.scss';

interface IArticleBlockTextProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleBlockText: FunctionComponent<IArticleBlockTextProps> = memo(
    ({ className, block }) => {
        return (
            <div className={classNames(cls.ArticleBlockText, {}, [className])}>
                {block.title && (
                    <Text title={block.title} className={cls.title} />
                )}
                {block.paragraphs.map((paragraph, index) => (
                    <Text
                        key={block.id}
                        text={paragraph}
                        className={cls.paragraph}
                    />
                ))}
            </div>
        );
    },
);
