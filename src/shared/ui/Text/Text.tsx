import { FunctionComponent, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text: FunctionComponent<ITextProps> = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    }) => {
        return (
            <div
                className={classNames('', {}, [
                    className,
                    cls[theme],
                    cls[align],
                    cls[size],
                ])}
            >
                {title && <p className={cls.title}>{title}</p>}
                <p className={cls.text}>{text}</p>
            </div>
        );
    },
);
