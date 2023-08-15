import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { Comment } from 'entities/Comment';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface ICommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList: FunctionComponent<ICommentListProps> = ({
    className,
    comments,
    isLoading,
}) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                        className={cls.comment}
                    />
                ))
            ) : (
                <Text text={t('Комментариев нет')} />
            )}
        </div>
    );
};
