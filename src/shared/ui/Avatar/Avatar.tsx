import { FunctionComponent, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Avatar.module.scss';

interface IAvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar: FunctionComponent<IAvatarProps> = ({
    className,
    src,
    size,
    alt,
}) => {
    const styles = useMemo(() => {
        return {
            width: size || 100,
            height: size || 100,
        };
    }, [size]);

    return (
        <img
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
            src={src}
            alt={alt}
        />
    );
};
