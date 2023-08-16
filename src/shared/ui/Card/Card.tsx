import { ReactNode, FunctionComponent, HTMLAttributes } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Card.module.scss';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card: FunctionComponent<ICardProps> = ({
    className,
    children,
    ...otherProps
}) => {
    return (
        <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
            {children}
        </div>
    );
};
