import React, { FunctionComponent } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IIconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon: FunctionComponent<IIconProps> = ({ className, Svg }) => {
    return <Svg className={classNames(cls.Icon, {}, [className])} />;
};
