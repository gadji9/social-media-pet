import { FunctionComponent, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
}

export const Text: FunctionComponent<ITextProps> = memo(
    ({ className, title, text, theme = TextTheme.PRIMARY }) => {
        return (
            <div className={classNames('', {}, [className, cls[theme]])}>
                {title && <p className={cls.title}>{title}</p>}
                <p className={cls.text}>{text}</p>
            </div>
        );
    },
);
