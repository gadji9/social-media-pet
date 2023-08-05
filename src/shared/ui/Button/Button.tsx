import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',

    OUTLINE = 'outline',
    OUTLINE_RED = 'outlineRed',

    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = memo(
    ({
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    }) => {
        const mods: Mods = {
            [cls[theme]]: true,
            [cls.square]: square,
            [cls[size]]: true,
            [cls.disabled]: disabled,
        };

        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, [className])}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);
