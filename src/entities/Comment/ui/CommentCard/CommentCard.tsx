import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';

import { FunctionComponent } from 'react';

import { Comment } from 'entities/Comment';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';

import cls from './CommentCard.module.scss';

interface ICommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard: FunctionComponent<ICommentCardProps> = ({
    className,
    comment,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <div>
                <div className={classNames(cls.CommentCard, {}, [className])}>
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton
                            className={cls.username}
                            width={100}
                            height={16}
                        />
                    </div>
                    <Skeleton className={cls.text} width="100%" height={50} />
                </div>
            </div>
        );
    }
    return (
        <div
            className={classNames(cls.CommentCard, {}, [
                className,
                cls.loading,
            ])}
        >
            <AppLink
                to={`${RoutePath.profile}${comment.user.id}`}
                className={cls.header}
            >
                {comment.user?.avatar ? (
                    <Avatar size={30} src={comment.user?.avatar} />
                ) : null}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </div>
    );
};
