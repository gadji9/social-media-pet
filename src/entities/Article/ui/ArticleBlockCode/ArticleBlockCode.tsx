import { FunctionComponent, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code/Code';

import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleBlockCode.module.scss';

interface IArticleBlockCodeProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleBlockCode: FunctionComponent<IArticleBlockCodeProps> = memo(
    ({ className, block }) => {
        return (
            <div className={classNames(cls.ArticleBlockCode, {}, [className])}>
                <Code text={block.code} />
            </div>
        );
    },
);
